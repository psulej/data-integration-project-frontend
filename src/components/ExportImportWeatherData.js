import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';

const ExportImportWeatherData = ({getAuthorizationHeaders}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


    const handleExportImport = () => {
        switch (selectedOption) {
            case 'exportXML':
                console.log('export xml');
                exportXML();
                break;
            case 'exportJSON':
                console.log('export json');
                exportJSON();
                break;
            case 'importXML':
                console.log('import xml');
                console.log('selected file', selectedFile);
                importXML()
                // Handle import XML logic
                break;
            case 'importJSON':
                console.log('import json');
                console.log('selected file', selectedFile);
                importJSON();
                // Handle import JSON logic
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
            headers: {...getAuthorizationHeaders(), 'Content-Type': 'application/json'}
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
            })
            .catch((error) => {
                console.error('Export failed:', error);
            });
    };

    const exportJSON = () => {
        fetch(`http://localhost:8080/data/weather/export/json`, {
            method: 'GET',
            headers: {...getAuthorizationHeaders(), 'Content-Type': 'application/json'}
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
            })
            .catch((error) => {
                console.error('Export failed:', error);
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
                    ...getAuthorizationHeaders()
                },
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Import failed');
                    }
                    console.log('XML import successful');
                })
                .catch((error) => {
                    console.error('Import failed:', error);
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
                })
                .catch((error) => {
                    console.error('Import failed:', error);
                });
        }
    };



    return (
        <Container className="p-2">
            <Row className="justify-content-between align-items-center">
                <Col>
                    <Form.Select value={selectedOption} onChange={handleSelectChange}>
                        <option value="" disabled>Select IMPORT/EXPORT</option>
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
                                <Form.Control type="file" onChange={handleFileChange}/>
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
