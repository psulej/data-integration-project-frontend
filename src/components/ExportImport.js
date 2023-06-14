import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const ExportImport = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleExportImport = () => {
        switch (selectedOption) {
            case 'exportXML':
                console.log('export xml');
                break;
            case 'exportJSON':
                console.log('export json');
                break;
            case 'importXML':
                console.log('import xml');
                console.log('selected file', selectedFile);
                break;
            case 'importJSON':
                console.log('import json');
                console.log('selected file', selectedFile);
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

    return (
        <Container className="p-2">
            <Row className="justify-content-between align-items-center">
                <Col>
                    <Form.Select value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Select IMPORT/EXPORT</option>
                        <option value="exportXML">Export XML</option>
                        <option value="exportJSON">Export JSON</option>
                        <option value="importXML">Import XML</option>
                        <option value="importJSON">Import JSON</option>
                    </Form.Select>
                </Col>
                {shouldShowFileInput ? (
                    <Col>
                        <Row className='p-2'>
                            <Form.Group controlId="formFile">
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Form.Group>
                        </Row>
                        <Row className='p-2'>
                            <Button variant="primary" onClick={handleExportImport}>
                                Import
                            </Button>
                        </Row>
                    </Col>
                ) : (
                    shouldShowExportButton && (
                        <Col>
                            <Row className='p-2'>
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

export default ExportImport;
