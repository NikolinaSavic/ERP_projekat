import { useParams } from "react-router-dom";

const ProductDetailsScreen = () => {
    const { id } = useParams();
    console.log(id)
    return (
        <>
            <p>Product details screen</p>
        </>
    )
}

export default ProductDetailsScreen
