import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const noOfProducts = cartList.length
      let totalPrice = 0
      const allProducts = cartList.map(eachProduct => {
        totalPrice += eachProduct.quantity * eachProduct.price
        return null
      })
      return (
        <div className="cart-summary-container">
          <h1 className="total-order">
            Order Total:{' '}
            <span className="cart-summary-total-amount">Rs {totalPrice}/-</span>
          </h1>
          <p className="cart-summary-no-of-products">
            {noOfProducts} Items in cart
          </p>
          <button type="button" className="check-out-button">
            CheckOut
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
