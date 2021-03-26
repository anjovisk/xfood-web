import { React, useContext, useState } from 'react';
import { Alert, Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
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
    const [values, error, setError, handleChange, handleSubmit] = useForm();
    const {handleLogin} = useContext(AuthContext);

    return (
        <Container>
            <Row>
                <Col>
                    <Form inline onSubmit={handleSubmit(() => handleLogin(values))}>
                        <InputGroup className="mb-2 mr-sm-2" size="sm">
                            <InputGroup.Prepend>
                                <InputGroup.Text >@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl autoComplete="off" id="loginUserName" isInvalid={error}
                                type="email" placeholder="email" size="sm"
                                name="email" onChange={handleChange} 
                            />
                        </InputGroup>
                        <FormControl autoComplete="off" className="mb-2 mr-sm-2" size="sm" isInvalid={error}
                            type="password" placeholder="password" 
                            name="password" onChange={handleChange}
                        />
                        <Button variant="primary" type="submit" className="mb-2" size="sm">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    { error 
                        ? (
                            <Alert variant="danger" dismissible 
                                onClose={() => { setError(null) }}>
                                { error.message }
                            </Alert>
                        )
                        : <></>
                    }
                </Col>
            </Row>
        </Container>
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

    return [values, error, setError, handleChange, handleSubmit];
};