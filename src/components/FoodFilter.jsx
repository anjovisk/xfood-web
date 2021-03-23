import { Component } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import CategoryFilter from './CategoryFilter';
import AuthContext from './context/auth-context';

class FoodFilter extends Component {
    render() {
        return (
            <Container fluid="md">
                <AuthContext.Consumer>
                    {({authInfo}) => 
                        <AdminControls isAdmin={authInfo.isAuthenticated && authInfo.user.isAdmin} />
                    }
                </AuthContext.Consumer>
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

function AdminControls(props) {
    let controls = props.isAdmin
        ? (
            <Row className="justify-content-md-center">
                <Col>
                    <button>+</button>
                </Col>
            </Row>
        ) 
        : (
            <></>
        );
    return (
        <>
            {controls}
        </>
    );
}

export default FoodFilter;