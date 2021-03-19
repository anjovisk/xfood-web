import { Component } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import CategoryFilter from './CategoryFilter';

class FoodFilter extends Component {
    render() {
        return (
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col>
                        <Form.Control size="lg" type="text" placeholder="Nome do prato desejado..." 
                            value={ this.props.filterExpression }
                            onChange={ this.props.onFilterExpressionChanged }
                        />

                        
                    </Col>
                </Row>
                <Row className="justify-content-md-center" style={{ marginTop: '20px' }}>
                    <Col>
                        <CategoryFilter 
                                categories={this.props.categories}
                                onCategoriesChanged={ this.props.onCategoriesChanged }/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default FoodFilter;