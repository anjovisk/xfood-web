import { Component } from 'react';
import { Card, Button, Row, Col, OverlayTrigger, Popover, ButtonGroup } from 'react-bootstrap';
import AuthContext from './context/auth-context';

class Food extends Component {
    render() {
        return(
            <AuthContext.Consumer>
                {({authInfo}) => 
                    <Card border="primary" style={{ maxWidth: '35rem'}} as="article">
                        <FoodCardHeader 
                            food={this.props.food}
                            isAdmin={authInfo.isAuthenticated && authInfo.user.isAdmin}      
                        />
                        <FoodCardBody
                            food={this.props.food}
                            isAdmin={authInfo.isAuthenticated && authInfo.user.isAdmin}
                        />
                        <FoodCardFooter
                            food={this.props.food}
                            isAuthenticated={authInfo.isAuthenticated}
                            isAdmin={authInfo.isAuthenticated && authInfo.user.isAdmin}
                        />
                    </Card>
                }
            </AuthContext.Consumer>
        );
    }
}

function FoodCardHeader(props) {
    let adminColumn = null;
    if (props.isAdmin) {
        adminColumn = (
            <Col>
                <span>Status: { props.food.status.name }</span>
            </Col>
        );
    }
    let defaultColumn = (
        <Col>
            <span>Rating: { props.food.rating }</span>
        </Col>
    );
    return (
        <Card.Header>
            <Row>
                {adminColumn}
                {defaultColumn}
            </Row>
        </Card.Header>
    );
}

function FoodCardBody(props) {
    return (
        <>
            <Card.Img variant="top" src={ props.food.image } />
            <Card.Body>
                <Card.Title>{ props.food.name }</Card.Title>
                <Card.Subtitle>{ props.food.categories.map(category => category.name).join(',') }</Card.Subtitle>
                <Card.Text>{ props.food.description }</Card.Text>
            </Card.Body>
        </>
    );
}

function FoodCardFooter(props) {
    if (!props.isAuthenticated) {
        return (<></>);
    }
    let footerContent = null; 
    if (props.isAdmin) {
        const popover = (
            <Popover id="popover-food-settings">
                <Popover.Title as="h3">{props.food.name}</Popover.Title>
                <Popover.Content>
                    <ButtonGroup vertical>
                        <Button>{props.food.status.value === "available" ? "Turn unavailable" : "Turn available"}</Button>
                        <Button>Change</Button>
                        <Button>Remove</Button>
                    </ButtonGroup>
                </Popover.Content>
            </Popover>
        );
        footerContent = (
            <OverlayTrigger trigger="click" placement="right" 
                overlay={popover} rootClose="true">
                <Button variant="success">Settings</Button>
            </OverlayTrigger>
        );
    } else {
        footerContent = (<Button variant="primary">Order</Button>);
    }
    return (
        <Card.Footer>
            {footerContent}
        </Card.Footer>
    );
}

export default Food;