import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

export const ChangeFoodStatusButton = (props) => {
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
                        throw Error("The food's status could not be changed. Food not found.");
                    default:
                        throw Error("The food's status could not be changed.");
                }
            }
        ).then(
            (result) => {
                if (props.onFoodStatusChanged) {
                    props.onFoodStatusChanged(food.id, result.status);
                }
                setChangingStatus(false);
            },
            (error) => {
                setChangingStatus(false);
                if (props.onError) {
                    props.onError( { title: food.name, message: error.message });
                }
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

    return (
        <Button style={{minWidth: "150px"}} 
            onClick={!isChangingStatus ? () => changeFoodStatus(props.food) : null } 
            disabled={isChangingStatus}>
            {isChangingStatus 
                ? loadingSpinner 
                : props.food.status.value === "available" ? "Turn unavailable" : "Turn available" 
            }
        </Button>
    );
}

export default ChangeFoodStatusButton;