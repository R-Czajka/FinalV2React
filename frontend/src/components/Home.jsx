import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../slices/cartSlice";
import { useGetAllProductsQuery } from "../slices/productsApi";
import Footer from "./Footer";

const Home = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container" style={{ backgroundColor: "#99D19C" }}>
      {status === "success" ? (
        <>
          <h2>Product List</h2>
          <div className="products" >
            {data &&
              data?.map((product) => (
                <div key={product.id} className="product" style={{ backgroundColor: "white" }}>
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}
                  style={{ backgroundColor: "green", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer" }}
                  >
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>

          <Footer />
                
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
