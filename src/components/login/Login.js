import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.css";

const Login = ({
    authenticateUser,
    loginNotifications,
    clearLoginNotifiactions
}) => {
    const [data, setData] = useState({
        login: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        login: "",
        password: ""
    });

    console.log("login not", loginNotifications)

    const handleChange = (e) => {
        const { name, value } = e.target;

        let error = "";
        switch (name) {
            case "login":
                error = !value.match(/^[A-Za-z0-9]{3,14}$/)
                    ? "Login must be alphanumeric and 3-14 characters long"
                    : "";
                break;
            case "password":
                error = !value.match(/^[A-Za-z0-9]{5,14}$/)
                    ? "Password must be alphanumeric and 5-14 characters long"
                    : "";
                break;
            default:
                break;
        }

        setData({ ...data, [name]: value });
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasErrors = Object.values(errors).some((error) => error !== "");
        if (hasErrors) { return; }
        try {
            await authenticateUser(data.login, data.password);
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div style={{ height: "100vh" }} className="App">
            <Container className="login_container">
                <Row className="login_form_container">
                    <Col className="left" xs={12} md={8}>
                        <Form className="form_container" onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <Form.Control
                                type="login"
                                placeholder="Login"
                                name="login"
                                onChange={handleChange}
                                value={data.login}
                                className="input my-2 mt-4"
                            />
                            {errors.login && <div className="error_msg">{errors.login}</div>}
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                className="input mb-4"
                            />
                            {errors.password && (<div className="error_msg">{errors.password}</div>)}
                            {loginNotifications.includes("INVALID_LOGIN_OR_PASSWORD") ? (
                                <div className="error_msg">Invalid login or password</div>) : null}
                            <Button type="submit" size="lg" variant="outline-light">
                                Sign In
                            </Button>
                        </Form>
                    </Col>
                    <Col className="right" xs={12} md={4}>
                        <h1 className="my-4">Move to registration</h1>
                        <Link to="/register">
                            <Button type="button" size="lg" variant="outline-light" onClick={() => clearLoginNotifiactions()}>
                                Sign up
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
