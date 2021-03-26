import { useEffect, useState } from "react";
import { Button, Row, Col, Form, Container, Modal } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import LoadingPageError from "../LoadingPageError";

const emptyFood = {name: "", description: "", categories: []};

const FoodForm = () => {
    const [isLoaded, setLoaded] = useState(false);
    const [loadingError, setLoadingError] = useState(null);
    const {values, setValues, categories, setCategories, error, setError, handleChange, handleCategoryChange, handleSubmit} = useForm();
    let { id } = useParams();
    
    function loadData() {
        if (isLoaded) return;
        let promisses = [fetch("http://localhost:3001/public/v1/foodCategories").then(res => { return res.json(); })];
        if (parseInt(id, 10)) {
            promisses.push(
                fetch(`http://localhost:3001/public/v1/foods/${id}`)
                .then(res => {
                    switch (res.status) {
                        case 200:
                            return res.json();
                        case 404:
                            return {error: Error("The food could not be removed. Food not found.")};
                        default:
                            return {error: Error("The food could not be removed.")};
                    }
                })
            );
        } else {
            promisses.push(Promise.resolve(emptyFood));
        }
        Promise.all(
            promisses
        ).then(([foodCategories, food]) => {
            setLoaded(true);
            if (food.error) {
                setLoadingError(food.error);
            } else {
                let categoriesAux = foodCategories.slice().map((category) => {
                    return {
                        "value": category.value,
                        "name": category.name,
                        "isSelected": food.categories
                            && food.categories.findIndex(selectedCategory => selectedCategory.value === category.value) !== -1
                    }
                });
                setValues(food);
                setCategories(categoriesAux)
            }
        });
    }

    useEffect(() => {
        loadData();
    });
    
    if (!isLoaded) {
        return (<Loading/>);
    }
    if (loadingError) {
        return (
            <LoadingPageError error={loadingError}/>
        );
    }

    let categoriesCheckbox = categories.map(
        category => (
            <Form.Check key={category.value}
                type="checkbox"
                label={category.name}
                name={`categories-${category.name}`}
                id={`categories-${category.name}-checkbox`}
                defaultChecked={category.isSelected}
                onChange={(e) => handleCategoryChange(category, e)}
            />
        ));

    return (
        <>
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="formFoodName">
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control autoComplete="off" placeholder="food name" 
                                        name="name" value={values.name} onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formFoodDescription">
                                <Form.Label column sm={2}>
                                    Description
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="textarea" placeholder="food description" rows={5}
                                        name="description" value={values.description} onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            
                            <fieldset>
                                <Form.Group as={Row}>
                                    <Form.Label as="legend" column sm={2}>
                                        Categories
                                    </Form.Label>
                                    <Col sm={10}>
                                        {categoriesCheckbox}
                                    </Col>
                                </Form.Group>
                            </fieldset>
                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                        <Button type="submit">Save</Button>
                                    </Col>
                                    <Col>
                                    <Link to="/foods">Go back foods</Link>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Modal show={error} onHide={ () => {setError(null)} }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                <Modal.Title>{error && error.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error && error.message}</Modal.Body>
            </Modal>
        </>
    );
};

export default FoodForm;

const useForm = () => {
    const [values, setValues] = useState(emptyFood);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    const handleChange = (event) => {
        const auxValues = { ...values }
        auxValues[event.target.name] = event.target.value;
        setValues(auxValues);
    };

    const handleCategoryChange = (changedCategory, event) => {
        let categoriesAux = categories.slice().map((category) => {
            return {
                "value": category.value,
                "name": category.name,
                "isSelected": category.value === changedCategory.value 
                    ? !changedCategory.isSelected
                    : category.isSelected
            }
        });
        setCategories(categoriesAux);
    };

    const handleSubmit =  (event) => {
        try {
            let method = values.id ? 'PUT' : "POST";
            let url = "http://localhost:3001/public/v1/foods";
            if (values.id) {
                url = url.concat(`/${values.id}`);
            }
            let food = {
                name: values.name, 
                description: values.description, 
                categories: categories
                    .filter(category => category.isSelected)
                    .map(category => {
                        return category.value
                    })
            };
            fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(food)
            }).then(
                res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    switch (res.status) {
                        case 200:
                        case 201:
                            return res.json();
                        default:
                            throw Error("The food could not be saved.");
                    }
                }
            ).then(
                (food) => {
                    history.push("/foods");
                },
                (error) => {
                    setError({title: "Error", message: error.message});
                }
            );
        } catch (error) {
            setError(error);
        }
        event.preventDefault();
    };

    return {values, setValues, categories, setCategories, error, setError, handleChange, handleCategoryChange, handleSubmit};
};