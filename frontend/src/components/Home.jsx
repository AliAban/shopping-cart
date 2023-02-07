import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useGetAllProductsQuery } from "../services/productsApi";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  
  const dispatch = useDispatch();
  const notify = (product) => toast.success(`Added ${product.name} to Cart`, {
    position: "bottom-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log("Add to cart");
    notify(product);
  };

  const cartItems = useSelector(state => state.cart.cartItems);
  return (
    <div className="container text-center py-4">
      <h1>New Arrivals</h1>
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <div className="row justify-content-center">
          {data.map((product) => {
            return (
              <div className="card col-3 m-1" key={product.id}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "70%" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.decs}</p>
                  <p>
                    <b>Rs {product.price}</b>
                  </p>
                  <button
                    className={`btn btn-${cartItems.findIndex(productInCart => product.id === productInCart.id) >= 0 ? "success" : "primary"}`}
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                  >
                   {cartItems.findIndex(productInCart => product.id === productInCart.id) >= 0 ? "Added": "Add to cart"} 
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
