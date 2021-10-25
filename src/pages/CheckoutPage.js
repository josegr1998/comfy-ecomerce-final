import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
//al principio este componetne solo devuelve el page hero y el h1 de checkout here. Una vez terminada toda la funcionalidad del proyecto ahi recien agregar stripe
const CheckoutPage = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>your cart is empty</h2>
            <Link to='products' className='btn'>
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: grid;
  place-items: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
