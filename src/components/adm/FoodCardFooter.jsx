import { useState } from "react";
import { Button, ButtonGroup, Card, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import ChangeFoodStatusButton from './ChangeFoodStatusButton';
import DeleteFoodButton from './DeleteFoodButton';

export const FoodCardFooter = (props) => {
    const [error, setError] = useState(null);

    const onError = (error) => {
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
                        onError={onError}
                    />
                    <Button>Change</Button>
                    <DeleteFoodButton
                        onFoodRemoved={props.onFoodRemoved}
                        food={props.food}
                        onError={onError}
                    />
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