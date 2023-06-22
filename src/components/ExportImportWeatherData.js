import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';


const ExportImportWeatherData = ({ getAuthorizationHeaders, fetchWeatherData }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getAcceptedFileExtensions = () => {
        switch (selectedOption) {
            case "importXML": return ".xml"
            case "importJSON": return ".json"
            default: return ""
        }
    }

    const handleExportImport = () => {
        switch (selectedOption) {
            case 'exportXML':
                exportXML();
                break;
            case 'exportJSON':
                exportJSON();
                break;
            case 'importXML':
                importXML();

                break;
            case 'importJSON':
                importJSON();
                break;
            default:
                break;
        }
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const shouldShowFileInput = selectedOption.startsWith('import');
    const shouldShowExportButton = selectedOption.startsWith('export');

    const exportXML = () => {
        fetch(`http://localhost:8080/data/weather/export/xml`, {
            method: 'GET',
            headers: { ...getAuthorizationHeaders(), 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Export failed');
                }
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'weather-data.xml');
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
                showSuccessMessage('XML export successful');
            })
            .catch((error) => {
                console.error('Export failed:', error);
                showErrorMessage('Export failed');
            });
    };

    const exportJSON = () => {
        fetch(`http://localhost:8080/data/weather/export/json`, {
            method: 'GET',
            headers: { ...getAuthorizationHeaders(), 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Export failed');
                }
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'weather-data.json');
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
                showSuccessMessage('JSON export successful');
            })
            .catch((error) => {
                console.error('Export failed:', error);
                showErrorMessage('Export failed');
            });
    };

    const importXML = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            console.log(formData.has('file'));
            console.log('filename:', selectedFile.name);

            const url = 'http://localhost:8080/data/weather/import/xml';

            fetch(url, {
                method: 'POST',
                headers: {
                    ...getAuthorizationHeaders(),
                },
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Import failed');
                    }
                    console.log('XML import successful');
                    showSuccessMessage('XML import successful');
                })
                .then(fetchWeatherData)
                .catch((error) => {
                    console.error('Import failed:', error);
                    showErrorMessage('Import failed');
                });
        }
    };

    const importJSON = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            console.log(formData.has('file'));
            console.log('filename:', selectedFile.name);

            const url = 'http://localhost:8080/data/weather/import/json';

            fetch(url, {
                method: 'POST',
                headers: {
                    ...getAuthorizationHeaders(),
                },
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Import failed');
                    }
                    console.log('JSON import successful');
                    showSuccessMessage('JSON import successful');
                })
                .then(fetchWeatherData)
                .catch((error) => {
                    console.error('Import failed:', error);
                    showErrorMessage('Import failed');
                });
        }
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
    };

    const showErrorMessage = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        }, 2000);
    };

    return (
        <Container className="p-2">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <Row className="justify-content-between align-items-center">
                <Col>
                    <Form.Select value={selectedOption} onChange={handleSelectChange}>
                        <option value="" disabled>
                            Select IMPORT/EXPORT
                        </option>
                        <option value="exportXML">Export XML</option>
                        <option value="exportJSON">Export JSON</option>
                        <option value="importXML">Import XML</option>
                        <option value="importJSON">Import JSON</option>
                    </Form.Select>
                </Col>
                {shouldShowFileInput ? (
                    <Col>
                        <Row className="p-2">
                            <Form.Group controlId="formFile">
                                <Form.Control
                                    type="file"
                                    accept={getAcceptedFileExtensions()}
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="p-2">
                            <Button variant="primary" onClick={handleExportImport}>
                                Import
                            </Button>
                        </Row>
                    </Col>
                ) : (
                    shouldShowExportButton && (
                        <Col>
                            <Row className="p-2">
                                <Button variant="primary" onClick={handleExportImport}>
                                    Export
                                </Button>
                            </Row>
                        </Col>
                    )
                )}
            </Row>
        </Container>
    );
};

export default ExportImportWeatherData;
