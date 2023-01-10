import React, { Fragment, useEffect, useState } from 'react'
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import Profile from './Profile';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import { NavLink } from 'react-router-dom';


function Editor() {

  

  const [type, setType] = useState();
  const [isGraduate, setisGraduate] = useState(false);
  const [isExperienced, setIsExperienced] = useState(false);

  useEffect(() => {

    if (type === 'gra') {
      setisGraduate(true)
      setIsExperienced(false)
    }
    if (type === 'exp') {
      setIsExperienced(true)
      setisGraduate(false)
    }

    localStorage.setItem('resumeType', type);

  }, [type]);

  return (
    <Fragment>

      {/* Card Container */}
      <Container>
        <Row className="justify-content-center mt-2">
          <Col md={8} sm={12} className="d-flex justify-content-between align-items-center bg-light rounded">
            <h5 className="m-0">Choose Resume Type</h5>
          </Col>
        </Row>

        <div className='Card-container'>
          <Row xs={1} md={2} className="g-4">
            <Col>
              <Card style={{ width: '18rem', height: '19rem' }}>
                <Card.Img variant="top" src='https://iili.io/H7UvS6v.webp'/>
                <Card.Body>
                  <Card.Title>Graduate</Card.Title>
                  <Button variant={isGraduate? "success" :"primary"} disabled={isGraduate} onClick={() => setType('gra')}>{isGraduate ? <span style={{ color: '#fff68f' }}>Selected</span> : <span>Select</span>}</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem', height: '19rem' }}>
                <Card.Img variant="top" src='https://iili.io/H7UvgFR.jpg'/>
                <Card.Body>
                  <Card.Title>Experienced</Card.Title>
                  <Button variant={isExperienced? "success" :"primary"} disabled={isExperienced} onClick={() => setType('exp')}>{isExperienced ? <span style={{ color: '#fff68f' }}>Selected</span> : <span>Select</span>}</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>


      {/* Main Container for editing Rows Components*/}
      <Container>

        <Profile></Profile>

        <About></About>
        {isExperienced ?
          <Experience></Experience> : null
        }
        <Education></Education>

        <Skills></Skills>

        <div className="d-grid col-2 mx-auto my-4 text-center">
          <NavLink className="nav-link align-middle bg-dark text-white p-2 rounded" to="/home/preview">Preview</NavLink>
        </div>

      </Container>

    </Fragment>
  )
}

export default Editor