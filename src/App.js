import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Main from "./components/Main"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import jwt from 'jwt-decode'
import { useState } from "react"

function App() {

  const initAuthData = () => {
    const token = localStorage.getItem("token")
    if (token == null) return null
    const decodedToken = jwt(token)
    const expirationTime = decodedToken.exp * 1000
    const currentTime = Date.now()
    if (currentTime >= expirationTime) {
      navigate("/login")
      localStorage.removeItem("token")
    }
    const user = {
      // id: decodedToken.id,
      login: decodedToken.login,
      name: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.roles
    }
    return { "token": token, "user": user }
  }

  const navigate = useNavigate();
  const [authData, setAuthData] = useState(initAuthData());
  const [registerNotifications, setRegisterNotifications] = useState([])
  const clearRegisterNotifications = () => {
    setRegisterNotifications([])
  }

  const registerUser = async (login, password, name, email) => {
    try {
      const requestBody = {
        login: login,
        password: password,
        name: name,
        email: email
      };
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

      const response = await fetch(`http://localhost:8080/auth/register`, requestOptions);
      const registerNotifications = []

      if (response.ok) {
        registerNotifications.push("REGISTRATION_SUCCESSFUL");
        setRegisterNotifications(registerNotifications)
        setTimeout(() => {
          console.log('Registration success');
          navigate("/login");
          clearLoginNotifiactions()
          clearRegisterNotifications()
        }, 2000);
      } else {
        const errorData = await response.json();
        console.log("errorData:", errorData.errors)
        if (errorData.errors.includes("LOGIN_EXISTS")) { registerNotifications.push("LOGIN_EXISTS") }
        if (errorData.errors.includes("EMAIL_EXISTS")) { registerNotifications.push("EMAIL_EXISTS") }
        setRegisterNotifications(registerNotifications)
        console.log("Registration failed:", errorData);
      }
    } catch (error) {
      console.log("An error occurred during registration:", error);
    }
  };

  const [loginNotifications, setLoginNotifications] = useState([])

  const clearLoginNotifiactions = () => {
    setLoginNotifications([])
  }

  const authenticateUser = async (login, password) => {
    try {
      const requestBody = {
        login: login,
        password: password
      };
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

      const response = await fetch(`http://localhost:8080/auth/login`, requestOptions);
      const loginNotifications = []

      if (response.ok) {
        const token = await response.json();
        console.log("token data:", token.accessToken);
        localStorage.setItem("token", token.accessToken);
        const decodedToken = jwt(token.accessToken)
        const user = {
          // id: decodedToken.id,
          login: decodedToken.login,
          name: decodedToken.name,
          email: decodedToken.email,
          roles: decodedToken.roles
        }
        console.log("user", user)
        setAuthData({ "token": token, "user": user })
        navigate("/")
      } else {
        if (response.status === 401) {
          setLoginNotifications([...loginNotifications, "INVALID_LOGIN_OR_PASSWORD"])
        }
      }
    } catch (error) {
      console.log("An error occurred during login:", error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token")
    setAuthData(null)
    clearLoginNotifiactions()
    clearRegisterNotifications()
    navigate("/login")
  }

  return (
    <Routes>
      {authData && <Route path="/" exact element={<Main
        logoutUser={logoutUser}
        authData={authData}
      />} />}
      <Route path="/register" exact element={<Register
        registerUser={registerUser}
        registerNotifications={registerNotifications}
        clearRegisterNotifications={clearRegisterNotifications}
      />} />
      <Route path="/login" exact element={<Login
        authenticateUser={authenticateUser}
        loginNotifications={loginNotifications}
        clearLoginNotifiactions={clearLoginNotifiactions}
      />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}

export default App