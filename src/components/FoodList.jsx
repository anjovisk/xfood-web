import { useState, useEffect, useContext } from 'react';
import FoodFilter from './FoodFilter';
import FoodCard from './FoodCard';
import { Badge, CardColumns, Col, Container, Row, Spinner } from 'react-bootstrap';
import AuthContext from './context/auth-context';

const defaultData = { foods: [], categories: [], error: null};

const Pratos = () => {
    const [data, setData] = useState(defaultData);
    const [isLoaded, setLoaded] = useState(false);
    const [filterExpression, setFilterExpression] = useState('');
    const {authInfo} = useContext(AuthContext);
    
    const onCategoriesChanged = (value) => {
        const categoriesAux = data.categories.slice();
        categoriesAux.forEach(category => {
            if (category.value === value) {
              category.isSelected = !category.isSelected;
              return;
            }
        });
        setData({...data, categories: categoriesAux});
    };

    const onFilterExpressionChanged = (e) => {
        setFilterExpression(e.target.value);
    };

    const onFoodStatusChanged = (id, status) => {
        const foodsAux = data.foods.slice();
        foodsAux.splice();
        foodsAux.forEach(food => {
            if (food.id === id) {
                food.status = status;
                return;
            }
        });
        setData({...data, foods: foodsAux});
    };

    useEffect(() => {
        setLoaded(false);
        //Postman mock url: https://5a99f513-7ded-4647-9a66-4c6eb540a270.mock.pstmn.io
        Promise.all([
            fetch("http://localhost:3001/public/v1/foods")
                .then(res => res.json() )
                .then(result => result, error => error),
            fetch("http://localhost:3001/public/v1/foodCategories").then(res => { return res.json(); })
        ]).then(([foods, foodCategories]) => {
            if (foods.error || foodCategories.error) {
                setData({
                    error: foods.error || foodCategories.error
                });
            } else {
                setData({
                    isLoaded: true,
                    foods: authInfo.isAuthenticated && authInfo.user.isAdmin
                        ? foods
                        : foods.filter(food => food.status.value === "available"),
                    categories: foodCategories.slice().map((category) => {
                        return {
                            "value": category.value,
                            "name": category.name,
                            "isSelected": false
                        }
                    })
                });
            }
            setLoaded(true);
        });
    }, [authInfo]);

    if (data.error) {
        return (<div>Error: {data.error.message}</div>);
    }
    if (!isLoaded) {
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
    } else {
        const selectedCategories = data.categories.filter(category => category.isSelected);
        const foodsComponent = data.foods.filter(food => {
                let categoryOk = selectedCategories.length === 0
                    || food.categories.filter(category => selectedCategories.some(selectedCategory => selectedCategory.value === category.value)).length > 0;
                let filterExpressionOk = filterExpression === ''
                    || food.name.toUpperCase().indexOf(filterExpression.toUpperCase()) !== -1
                return categoryOk && filterExpressionOk;
        }).map(food =>
            <FoodCard key={food.id} food={food}
                onFoodStatusChanged={ onFoodStatusChanged }
            />
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