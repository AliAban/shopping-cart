import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addQuantity, removeFromCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  
  const handleRemoveFromCart = (product)=>{
   dispatch( removeFromCart(product));
  }

  const handleAddQuantity = (product)=>{
    dispatch(addQuantity(product));
  }

  const cart = useSelector((state) => state.cart);
  return (
    <div className="container my-3">
      <h2 className="text-center my-3">Your Shopping Cart</h2>
      {!cart.cartItems.length ? (
        <div className="text-center m-5">
          <p>Your cart is currently empty</p>
          <Link to="/">
            Start Shopping{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </Link>
        </div>
      ) : (
        <>
          <div className="border-bottom cart-title">
            <span className="mx-4">PRODUCT</span>
            <span className="mx-4">PRICE</span>
            <span className="mx-4">QUANTITY</span>
            <span className="mx-4">TOTAL</span>
          </div>
          <div className="">
            {cart.cartItems.map((product) => (
              <div className="border-bottom cart-item " key={product.id}>
                <div className="cart-product-desc-container d-flex align-items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-img"
                  />
                  <div className="d-flex flex-column mx-2">
                    <h5>{product.name}</h5>
                    <p>{product.decs}</p>
                    <button className="btn btn-danger" onClick={()=> handleRemoveFromCart(product)}>Remove</button>
                  </div>
                </div>
                <span> Rs. {product.price}</span>
                <div className="cart-quantity d-flex align-items-center border rounded">
                  <button className="quantity-btns">-</button>
                  <span className="py-1 px-2">{product.quantityInCart}</span>
                  <button className="quantity-btns" onClick={() => handleAddQuantity(product)}>+</button>
                </div>
                <span>Rs. {product.price * product.quantityInCart} </span>
              </div>
            ))}
          </div>
          <div className="cart-summary d-flex justify-content-between my-5 px-2">
            <div className="align-items-center d-flex">
              <button className="clear-cart-btn btn">Clear Cart</button>
            </div>
            <div className="cart-checkout d-flex flex-column justify-content-between">
              <div className="subtotal d-flex justify-content-between align-items-center">
                <h4>Subtotal</h4>
                <h6>Rs. {cart.cartTotalAmount}</h6>
              </div>
              <small className="my-2">
                Taxes and shipping calculated at checkout
              </small>
              <button className="btn btn-success">Check out</button>
              <div className="text-center my-4">
                <Link to={"/"}>
                  Continue Shopping
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
