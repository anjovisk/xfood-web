import { useState } from "react";
import { Button, ButtonGroup, Card, Modal, OverlayTrigger, Popover, Spinner } from "react-bootstrap";

export const FoodCardFooter = (props) => {
    const [error, setError] = useState(null);
    const [isChangingStatus, setChangingStatus] = useState(false);

    const changeFoodStatus = (food) => {
        setChangingStatus(true);
        const status = food.status.value === "available"
            ? { value: "unavailable", name: "Unavailable" }
            : { value: "available", name: "Available" };
        
        fetch(`http://localhost:3001/public/v1/foods/${food.id}/status`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(status)
        }).then(
            res => {
                if (res.status === 200) {
                    return res.json();
                }
                switch (res.status) {
                    case 200:
                        return res.json();
                    case 404:
                        throw Error("Food status could not be changed. Food not found.");
                    default:
                        throw Error("Food status could not be changed.");
                }
            }
        ).then(
            (result) => {
                props.onFoodStatusChanged(food.id, result.status);
                setChangingStatus(false);
            },
            (error) => {
                setChangingStatus(false);
                setError( { title: food.name, message: error.message });
            }
        );
    }

    const loadingSpinner = (
        <>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
                <span className="sr-only">Loading...</span>
            <Spinner/>
        </>
    );

    const popover = (
        <Popover id="popover-food-settings">
            <Popover.Title as="h3">{props.food.name}</Popover.Title>
            <Popover.Content>
                <ButtonGroup vertical>
                    <Button style={{minWidth: "150px"}} 
                        onClick={!isChangingStatus ? () => changeFoodStatus(props.food) : null } 
                        disabled={isChangingStatus}>
                        {isChangingStatus 
                            ? loadingSpinner 
                            : props.food.status.value === "available" ? "Turn unavailable" : "Turn available" 
                        }
                    </Button>
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