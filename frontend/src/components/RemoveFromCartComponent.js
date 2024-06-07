import { Button } from "react-bootstrap";

const RemoveFromCartComponent = ({ productId, removeFromCartHandler = false, orderCreated }) => {
    return (
        <Button
            type="button"
            variant="secondary"
            onClick={removeFromCartHandler ? () => removeFromCartHandler(productId) : undefined}
            style={orderCreated ? { display: "none" } : { display: "inline" }}
            disabled={orderCreated}
        >
            <i className="bi bi-trash"></i>
        </Button>
    )
}

export default RemoveFromCartComponent;