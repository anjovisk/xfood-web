import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FoodListControls = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Link to="/foods/new"><Button variant="success">New food</Button></Link>
                </Col>
            </Row>
        </Container>
    );
};

export default FoodListControls;