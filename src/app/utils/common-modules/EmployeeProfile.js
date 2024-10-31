import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { getEmployeeProfileById } from '../../../_metronic/redux/dashboardCrud';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import './form.css'
import { formatDates } from '../common';

//Field name and keys in order for view
const VIEW_FIELDS = [
  // {
  //   name: 'Image ',
  //   value: 'companyName'
  // },
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
    value: 'dateOfJoining',
    isDate: true
  },
  {
    name: 'Date of Confirmation',
    value: 'dateOfConfirmation',
    isDate: true
  },
  // {
  //   name: 'profile_image',
  //   value: 'profile_image',
  //   value: true
  // }
]

const EmployeeProfile = ({ employeeId }) => {
  const [data, setdata] = useState({})
console.log("employeeId view detail",employeeId)
  //Use Effect to execute whenever the employee Id is updated. This will fetch employee profile data from view created in Database
  useEffect(() => {
    if (employeeId) {
      getEmployeeProfileById(employeeId).then((res) => {
        if (res?.data?.data) {
          console.log("employee view detail",res?.data?.data)
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
          <div className='accordion-header-btn'>
            <Accordion.Toggle as={Button} eventKey="0">
              Employee Detail
              <KeyboardArrowDown />
            </Accordion.Toggle>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                
                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <div>
                          <div>
                            <div>
                            <img
                      name='profile_image'
                      src={data.profile_image ? `${data.profile_image}` : ''}
                      alt="Profile"
                      width={120}
                      height={120}
                    />
                              <br/>
                              <br/>
                           
                              <h4>Profile Image</h4>
                         
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
            {
              Object.keys(data).length ? <Row>
                {VIEW_FIELDS.map((obj, index) => (
                  <Col key={index} md={6} style={{ marginBottom: "2%" }}>
                    {/* If value is present then check if it's date then format date otherwise show value */}
                    {/* If value is not present then just show empty string */}
                    <strong>{obj.name}:</strong> {data[obj.value] ? obj.isDate ? formatDates(data[obj.value]) : data[obj.value] : ''} 
                  </Col>
                ))}
              </Row> : <>Please Choose an Employee</>
            }
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default EmployeeProfile;
