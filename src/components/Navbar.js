import { Navbar, Button, Col } from 'react-bootstrap';

function Navigation({
  logoutUser,
  authData,
}) {

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='p-1'>
      <Navbar.Brand href="" className='mx-2'>
        <p className="h4 me-4">data-integration-project</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'right' }}>
        <Navbar.Text className="ml-auto ms-2 mx-1 p-1">

        </Navbar.Text>
        <Col>

          <Navbar.Text className="mx-1 p-1">
            {authData.user.name}
          </Navbar.Text>

          <Navbar.Text className="mx-1 p-1">
            <Button
              variant="outline-light"
              className="float-right ml-sm-2 mt-2 mt-sm-0"
              size="md"
              onClick={logoutUser}
            >
              Logout
            </Button>
          </Navbar.Text>
        </Col>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
