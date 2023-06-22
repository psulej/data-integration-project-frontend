import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navbar';
import TabsNavigation from "./TabsNavigation";


function Main({ logoutUser, authData }) {

  const getAuthorizationHeaders = () => {
    const token = localStorage.getItem("token")
    return {
      'Authorization': `Bearer ${token}`
    }
  }

  return (
    <div>
      <header>
        <Navigation
          logoutUser={logoutUser}
          authData={authData}
        />
      </header>
        <main className="main-content">
          <TabsNavigation getAuthorizationHeaders={getAuthorizationHeaders} authData={authData}/>
        </main>
    </div>
  );
}

export default Main;
