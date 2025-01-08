import { useParams } from "react-router-dom";
import { productsData } from "../data/productsData";

const ProductDetails = () => {
  const params = useParams();

  const selectedProduct = productsData.find(
    (product) => product.id === Number(params.productId)
  );

  if (!selectedProduct) {
    return <h1>Product Not Found</h1>;
  }

  const { title, description, price } = selectedProduct;

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Price: {price}</p>
    </div>
  );
};

export default ProductDetails;
