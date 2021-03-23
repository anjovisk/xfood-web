import { React, useContext, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { AuthContext } from './context/auth-context';

export default Authentication;

function Authentication() {
    const {authInfo} = useContext(AuthContext);
    return authInfo.isAuthenticated
        ? (<LogoffControl
            user={authInfo.user}    
        />)
        : <LoginControl
            user={authInfo.user}
        />;
}

function LogoffControl() {
    const { authInfo, handleLogoff } = useContext(AuthContext);

    return (
        <Row>
            <Col>
                <span>Helo, { authInfo.user.firstName }</span>
                <Button variant="link" onClick={ handleLogoff }>Exit</Button>
            </Col>
        </Row>
    );
}

function LoginControl() {
    const [values, error, handleChange, handleSubmit] = useForm();
    const {handleLogin} = useContext(AuthContext);

    return (
        <Form onSubmit={handleSubmit(() => handleLogin(values))}>
            <Form.Row controlId="formBasicEmail">
                <Col>
                    <Form.Control size="sm"
                        type="email" placeholder="Enter email"
                        name="email" onChange={handleChange}
                    />
                    { error 
                        ? (
                            <Alert variant="danger">
                                { error.message }
                            </Alert>
                        )
                        : <></>
                    }
                </Col>
                <Col>
                    <Form.Control size="sm"
                        type="password" placeholder="Password" 
                        name="password" onChange={handleChange}
                    />
                </Col>
                <Col>
                    <Button variant="primary" type="submit" size="sm">
                        Login
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    );
}

const useForm = () => {
    const [values, setValues] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const auxValues = { ...values }
        auxValues[event.target.name] = event.target.value;
        setValues(auxValues);
    };

    const handleSubmit =  (submitCallback) => (event) => {
        try {
            submitCallback();
        } catch (error) {
            setError(error);
        }
        event.preventDefault();
    };

    return [values, error, handleChange, handleSubmit];
};