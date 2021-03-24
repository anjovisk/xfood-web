import { useState } from "react";
import { Button, ButtonGroup, Card, Modal, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import ChangeFoodStatusButton from './ChangeFoodStatusButton';

export const FoodCardFooter = (props) => {
    const [error, setError] = useState(null);

    const onChangeFoodStatusError = (error) => {
        setError(error);
    };

    const popover = (
        <Popover id="popover-food-settings">
            <Popover.Title as="h3">{props.food.name}</Popover.Title>
            <Popover.Content>
                <ButtonGroup vertical>
                    <ChangeFoodStatusButton
                        onFoodStatusChanged={props.onFoodStatusChanged}
                        food={props.food}
                        onError={onChangeFoodStatusError}
                    />
                    <Button>Change</Button>
                    <Button>Remove</Button>
                </ButtonGroup>
            </Popover.Content>
        </Popover>
    );

    const footerContent = (
        <OverlayTrigger trigger="click" placement="right" 
            overlay={popover} rootClose={true}
            transition={false}
        >
            <Button variant="success">
                Settings
            </Button>
        </OverlayTrigger>
    );
    return (
        <Card.Footer>
            {footerContent}
            <Modal show={error} onHide={ () => {setError(null)} }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                <Modal.Title>{error && error.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error && error.message}</Modal.Body>
            </Modal>
        </Card.Footer>
    );
}

export default FoodCardFooter;