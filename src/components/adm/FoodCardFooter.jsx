import { Button, ButtonGroup, Card, OverlayTrigger, Popover } from "react-bootstrap";

export const FoodCardFooter = (props) => {
    function changeFoodStatus(food) {
        const status = food.status.value === "available"
            ? { value: "unavailable", name: "Unavailable" }
            : { value: "available", name: "Available" };
        props.onFoodStatusChanged(food.id, status);
    }

    const popover = (
        <Popover id="popover-food-settings">
            <Popover.Title as="h3">{props.food.name}</Popover.Title>
            <Popover.Content>
                <ButtonGroup vertical>
                    <Button onClick={ () => changeFoodStatus(props.food) }>{props.food.status.value === "available" ? "Turn unavailable" : "Turn available"}</Button>
                    <Button>Change</Button>
                    <Button>Remove</Button>
                </ButtonGroup>
            </Popover.Content>
        </Popover>
    );
    const footerContent = (
        <OverlayTrigger trigger="click" placement="right" 
            overlay={popover} rootClose={true}>
            <Button variant="success">Settings</Button>
        </OverlayTrigger>
    );
    return (
        <Card.Footer>
            {footerContent}
        </Card.Footer>
    );
}

export default FoodCardFooter;