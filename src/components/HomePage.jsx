import React from 'react';
import { Carousel, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const img_feijoada = require('../images/food/feijoada.jpg');
var img_food = require('../images/food/food.jpg');

const HomePage = () => {
    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <Carousel>
                        <Carousel.Item interval={3000}>
                            <Jumbotron>
                                <h1>X-Food</h1>
                                <p>
                                    This is a simple hero unit, a simple jumbotron-style component for calling
                                    extra attention to featured content or information.
                                </p>
                            </Jumbotron>
                            <Carousel.Caption>
                                <Link to="/foods">Foods</Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                            className="d-block w-100"
                            src={img_food.default}
                            style={{maxHeight: "400px"}}
                            alt="Second slide"
                            />
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                            className="d-block w-100"
                            src={img_feijoada.default}
                            style={{maxHeight: "400px"}}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <Col sm></Col>
            </Row>
        </Container>
    );
}

export default HomePage;