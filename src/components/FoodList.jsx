import { Component } from 'react';
import FoodFilter from './FoodFilter';
import Food from './Food';
import { CardColumns, Col, Container, Row } from 'react-bootstrap';

class Pratos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            isLoaded: false,
            error: null,
            categories: [],
            filterExpression: ""
        };
        this.onCategoriesChanged = this.onCategoriesChanged.bind(this);
        this.onFilterExpressionChanged = this.onFilterExpressionChanged.bind(this);
    }
    
    onCategoriesChanged(value) {
        const categories = this.state.categories.slice();
        categories.forEach(category => {
            if (category.value === value) {
              category.isSelected = !category.isSelected;
              return;
            }
        });
        this.setState({categories: categories});
    }

    onFilterExpressionChanged(e) {
        this.setState({
            filterExpression: e.target.value
        });
    }

    componentDidMount() {
        Promise.all([
            fetch("https://4c7c2cc2-0a07-43dc-bac7-63a47e79809f.mock.pstmn.io/public/v1/foods")
                .then(res => res.json() )
                .then(result => result, error => error),
            fetch("https://4c7c2cc2-0a07-43dc-bac7-63a47e79809f.mock.pstmn.io/public/v1/foodCategories").then(res => { return res.json(); })
        ]).then(([foods, foodCategories]) => {
            if (foods.error || foodCategories.error) {
                this.setState({
                    isLoaded: true,
                    error: foods.error || foodCategories.error
                });
            } else {
                this.setState({
                    isLoaded: true,
                    foods: foods,
                    categories: foodCategories.slice().map((category) => {
                        return {
                            "value": category.value,
                            "name": category.name,
                            "isSelected": false
                        }
                    })
                });
            }
        });
    }
    
    render() {
        const { error, isLoaded, foods } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            const selectedCategories = this.state.categories.filter(category => category.isSelected);
            const foodsComponent = foods.filter(food => {
                    let categoryOk = selectedCategories.length === 0
                        || food.categories.filter(category => selectedCategories.some(selectedCategory => selectedCategory.value === category.value)).length > 0;
                    let filterExpressionOk = this.state.filterExpression === ''
                        || food.name.toUpperCase().indexOf(this.state.filterExpression.toUpperCase()) !== -1
                    return categoryOk && filterExpressionOk;
            }).map(food =>
                <Food key={food.id} food={food}/>
            );
            return (
                <Container fluid="md" as="section">
                    <Row className="justify-content-md-center" style={{ marginTop: '20px' }}>
                        <Col>
                            <FoodFilter 
                                filterExpression={ this.state.filterExpression }
                                onFilterExpressionChanged={ this.onFilterExpressionChanged }
                                categories={ this.state.categories } 
                                onCategoriesChanged={ this.onCategoriesChanged }/>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{ marginTop: '20px' }}>
                        <Col>
                            <CardColumns>
                                {foodsComponent}
                            </CardColumns>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Pratos;