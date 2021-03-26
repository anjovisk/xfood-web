import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

export const DeleteFoodButton = (props) => {
    const [isRemoving, setRemoving] = useState(false);

    const deleteFood = (food) => {
        setRemoving(true);
        fetch(`http://localhost:3001/public/v1/foods/${food.id}`, {
            method: 'DELETE'
        }).then(
            res => {
                if (res.status === 200) {
                    return;
                }
                switch (res.status) {
                    case 404:
                        throw Error("The food could not be removed. Food not found.");
                    default:
                        throw Error("The food could not be removed.");
                }
            }
        ).then(
            () => {
                if (props.onFoodRemoved) {
                    props.onFoodRemoved(food.id);
                } else {
                    setRemoving(false);
                }
            },
            (error) => {
                setRemoving(false);
                if (props.onError) {
                    props.onError( { title: food.name, message: error.message });
                }
            }
        );
    }

    const removingSpinner = (
        <>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
                <span className="sr-only">Removing...</span>
            <Spinner/>
        </>
    );

    return (
        <Button style={{minWidth: "150px"}} 
            onClick={!isRemoving ? () => deleteFood(props.food) : null } 
            disabled={isRemoving}>
            {isRemoving 
                ? removingSpinner 
                : "Remove" 
            }
        </Button>
    );
}

export default DeleteFoodButton;