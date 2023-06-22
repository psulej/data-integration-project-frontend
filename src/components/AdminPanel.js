import { Button, Col, Row, Alert } from "react-bootstrap";
import {useState} from "react";

function AdminPanel({ getAuthorizationHeaders, fetchWeatherData, fetchMortalityData }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const deleteWeatherData = () => {
        fetch(`http://localhost:8080/data/weather`, {
            method: 'DELETE',
            headers: { ...getAuthorizationHeaders(), 'Content-Type': 'application/json' }
        })
            .then(() => {
                setSuccessMessage("Successfully deleted weather data");
                fetchWeatherData();
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 2000);
            })
            .catch((error) => {
                setErrorMessage(`Error deleting weather data: ${error.message}`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 2000);
            });
    };

    const deleteMortalityData = () => {
        fetch(`http://localhost:8080/data/mortality`, {
            method: 'DELETE',
            headers: { ...getAuthorizationHeaders(), 'Content-Type': 'application/json' }
        })
            .then(() => {
                setSuccessMessage("Successfully deleted mortality data");
                fetchMortalityData();
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 2000);
            })
            .catch((error) => {
                setErrorMessage(`Error deleting mortality data: ${error.message}`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 2000);
            });
    };

    const handleAlertDismiss = () => {
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    return (
        <div>
            <div className="my-2 mx-auto p-2" style={{ display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
                <h3>Admin panel</h3>
            </div>
            {successMessage && (
                <Alert variant="success" dismissible onClose={handleAlertDismiss}>
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert variant="danger" dismissible onClose={handleAlertDismiss}>
                    {errorMessage}
                </Alert>
            )}
            <Row className="mb-2">
                <Col>
                    <Button variant="danger" size="sm" onClick={() => deleteWeatherData()} style={{ marginLeft: '10px' }}>
                        Wipe weather data
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="danger" size="sm" onClick={() => deleteMortalityData()} style={{ marginLeft: '10px' }}>
                        Wipe mortality data
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default AdminPanel;
