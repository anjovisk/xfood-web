import { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import AuthContext from './context/auth-context';
import { FoodCardFooter as FoodCardFooterAdm } from './adm/FoodCardFooter';
import { FoodCardFooter as FoodCardFooterUser } from './FoodCardFooter';

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
                            onFoodStatusChanged={ this.props.onFoodStatusChanged }
                            onFoodRemoved={ this.props.onFoodRemoved }
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
    if (props.isAdmin) {
        return (
            <FoodCardFooterAdm
                food={props.food}
                onFoodStatusChanged={props.onFoodStatusChanged}
                onFoodRemoved={props.onFoodRemoved}
            />
        );
    }
    return (
        <FoodCardFooterUser />
    );
}

export default Food;