import { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class Food extends Component {
    render() {
        return(
            <Card border="primary" style={{ maxWidth: '35rem', height: '35rem' }} as="article">
                <Card.Img variant="top" src={ this.props.food.image } />
                <Card.Body>
                    <Card.Title>{ this.props.food.name }</Card.Title>
                    <Card.Subtitle>{ this.props.food.categories.map(category => category.name).join(',') }</Card.Subtitle>
                    <Card.Text>{ this.props.food.description }</Card.Text>
                    <Button variant="primary">Go</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Food;