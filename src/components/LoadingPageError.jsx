import { Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";

const Loading = (props) => {
    let history = useHistory();

    let back = (e) => {
        e.stopPropagation();
        history.goBack();
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    Requested page coud not be loaded:
                    {props.error.message}
                    <Button onClick={back}>Go back</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Loading;