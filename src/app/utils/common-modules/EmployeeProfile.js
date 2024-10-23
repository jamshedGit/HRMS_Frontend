import React from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';

const EmployeeProfile = ({ data }) => {
    return (
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Person Bio Data
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row>
                  {Object.keys(data).map((key, index) => (
                    <Col key={index} md={6}>
                      <strong>{key}:</strong> {data[key]}
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
};

export default EmployeeProfile;
