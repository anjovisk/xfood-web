import { React, useContext, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
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
    const { handleLogoff } = useContext(AuthContext);

    return (
        <>
            <button onClick={ handleLogoff }>Exit</button>
        </>
    );
}

function LoginControl() {
    const [values, error, handleChange, handleSubmit] = useForm();
    const {handleLogin} = useContext(AuthContext);

    return (
        <Form onSubmit={handleSubmit(() => handleLogin(values))}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                />
                { error 
                    ? (
                        <Alert variant="danger">
                            { error.message }
                        </Alert>
                    )
                    : <></>
                }
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                    name="password"
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
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