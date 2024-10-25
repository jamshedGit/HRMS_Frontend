import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { getEmployeeProfileById } from '../../../_metronic/redux/dashboardCrud';

//Field name and keys in order for view
const VIEW_FIELDS = [
  {
    name: 'Company ',
    value: 'companyName'
  },
  {
    name: 'Subsidiary',
    value: 'subsidiaryName'
  },
  {
    name: 'Department',
    value: 'departmentName'
  },
  {
    name: 'Reporting To',
    value: 'reportToName'
  },
  {
    name: 'Grade',
    value: 'gradeName'
  },
  {
    name: 'Designation',
    value: 'designationName'
  },
  {
    name: 'Country',
    value: 'countryName'
  },
  {
    name: 'City',
    value: 'cityName'
  },
  {
    name: 'Location',
    value: 'locationName'
  },
  {
    name: 'Region',
    value: 'regionName'
  },
  {
    name: 'Employee Type',
    value: 'employeeTypeName'
  },
  {
    name: 'Payroll Group',
    value: 'payrollName'
  },
  {
    name: 'Team',
    value: 'teamName'
  },
  {
    name: 'Default Shift',
    value: 'shiftName'
  },
  {
    name: 'Marital Status',
    value: 'maritalStatus'
  },
  {
    name: 'Gender',
    value: 'gender'
  },
  {
    name: 'Date of Joining',
    value: 'dateOfJoining'
  },
  {
    name: 'Date of Confirmation',
    value: 'dateOfConfirmation'
  }
]

const EmployeeProfile = ({ employeeId }) => {
  const [data, setdata] = useState({})

  //Use Effect to execute whenever the employee Id is updated. This will fetch employee profile data from view created in Database
  useEffect(() => {
    if (employeeId) {
      getEmployeeProfileById(employeeId).then((res) => {
        if (res?.data?.data) {
          setdata(res.data.data)
        }
      }).catch((err) => {
        setdata({})
      })
    }
    else {
      setdata({})
    }

  }, [employeeId])

  return (
    <Accordion defaultActiveKey="">
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} eventKey="0">
            Person Bio Data
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {
              Object.keys(data).length ?  <Row>
                {VIEW_FIELDS.map((obj, index) => (
                  <Col key={index} md={6}>
                    <strong>{obj.name}:</strong> {data[obj.value] || ''}
                  </Col>
                ))}
              </Row> : <>Please Choose an Employee</>
            }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default EmployeeProfile;
