import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  clearCartList = () => {
    this.setState({cartList: []})
  }

  removeCartItem = productId => {
    const {cartList} = this.state
    const updatedProducts = cartList.filter(
      eachProduct => eachProduct.id !== productId,
    )
    this.setState({cartList: updatedProducts})
  }

  increaseCartItemQuantity = productId => {
    const {cartList} = this.state
    const updatedProducts = cartList.map(eachProduct => {
      if (eachProduct.id === productId) {
        const quantity = eachProduct.quantity + 1
        const updatedProduct = {...eachProduct, quantity}
        return updatedProduct
      }
      return eachProduct
    })

    this.setState({cartList: updatedProducts})
  }

  decrementCartItemQuantity = productId => {
    const {cartList} = this.state
    const updatedProducts = cartList.map(each => {
      if (each.id === productId) {
        if (each.quantity > 1) {
          const quantity = each.quantity - 1
          const updatedProduct = {...each, quantity}
          return updatedProduct
        }
        return null
      }
      return each
    })
    const doubleUpdatedProducts = updatedProducts.filter(each => each !== null)
    console.log(updatedProducts)
    console.log(doubleUpdatedProducts)
    this.setState({cartList: doubleUpdatedProducts})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {id} = product
    const {cartList} = this.state
    const productExist = cartList.filter(each => each.id === id)
    if (productExist.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.increaseCartItemQuantity(id)
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.clearCartList,
          incrementCartItemQuantity: this.increaseCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
