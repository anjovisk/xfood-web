import { Badge, Container, Row, Col, Spinner } from "react-bootstrap";

const Loading = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Spinner animation="border" variant="success" role="status"/>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h3>
                        <Badge pill variant="success">
                            Loading...
                        </Badge>
                    </h3>
                </Col>
            </Row>
        </Container>
    );
};

export default Loading;