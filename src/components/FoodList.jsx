import { useState, useEffect } from 'react';
import FoodFilter from './FoodFilter';
import FoodCard from './FoodCard';
import { CardColumns, Col, Container, Row } from 'react-bootstrap';

const Pratos = () => {
    const [data, setData] = useState({ foods: [], categories: [], isLoaded: false, error: null});
    const [filterExpression, setFilterExpression] = useState('');
    
    const onCategoriesChanged = (value) => {
        const categoriesAux = data.categories.slice();
        categoriesAux.forEach(category => {
            if (category.value === value) {
              category.isSelected = !category.isSelected;
              return;
            }
        });
        setData({...data, categories: categoriesAux});
    }

    const onFilterExpressionChanged = (e) => {
        setFilterExpression(e.target.value);
    }

    useEffect(() => {
        Promise.all([
            fetch("https://5a99f513-7ded-4647-9a66-4c6eb540a270.mock.pstmn.io/public/v1/foods")
                .then(res => res.json() )
                .then(result => result, error => error),
            fetch("https://5a99f513-7ded-4647-9a66-4c6eb540a270.mock.pstmn.io/public/v1/foodCategories").then(res => { return res.json(); })
        ]).then(([foods, foodCategories]) => {
            if (foods.error || foodCategories.error) {
                setData({
                    isLoaded: true,
                    error: foods.error || foodCategories.error
                });
            } else {
                setData({
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
    }, []);
    
    if (data.error) {
        return <div>Error: {data.error.message}</div>;
    }
    if (!data.isLoaded) {
        return <div>Loading...</div>
    } else {
        const selectedCategories = data.categories.filter(category => category.isSelected);
        const foodsComponent = data.foods.filter(food => {
                let categoryOk = selectedCategories.length === 0
                    || food.categories.filter(category => selectedCategories.some(selectedCategory => selectedCategory.value === category.value)).length > 0;
                let filterExpressionOk = filterExpression === ''
                    || food.name.toUpperCase().indexOf(filterExpression.toUpperCase()) !== -1
                return categoryOk && filterExpressionOk;
        }).map(food =>
            <FoodCard key={food.id} food={food}/>
        );
        return (
            <Container fluid="md" as="section">
                <Row className="justify-content-md-center" style={{ marginTop: '20px' }}>
                    <Col>
                        <FoodFilter 
                            filterExpression={ filterExpression }
                            onFilterExpressionChanged={ onFilterExpressionChanged }
                            categories={ data.categories } 
                            onCategoriesChanged={ onCategoriesChanged }/>
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

export default Pratos;