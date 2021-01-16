import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import productReducer from './products.js'
import cartReducer from './cart.js'
import singleProductReducer from './singleProduct.js'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import guestReducer from './guestCart.js'

const reducer = combineReducers({
  user: user,
  products: productReducer,
  product: singleProductReducer,
  cart: cartReducer,
  gCart: guestReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
