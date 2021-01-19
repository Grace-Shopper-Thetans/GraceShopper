import axios from 'axios'

// Action Types

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

// Action Creators

export const getCart = (cart) => ({
  type: GET_CART,
  cart,
})

export const addCartAction = (item) => ({
  type: ADD_TO_CART,
  item,
})

export const removeCartAction = (id) => ({
  type: DELETE_ITEM,
  id,
})

export const clearCartAction = (cart) => ({
  type: CLEAR_CART,
  cart,
})

// Thunk Creators

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/carts/`)
      console.log('running cart')
      dispatch(getCart(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const addToCart = (item) => {
  return async (dispatch) => {
    try {
      const input = item.target.value.split(',')
      const itemId = input[0]
      const userId = input[1]
      const {data} = await axios.post('/api/carts/', {itemId, userId})
      console.log('THIS IS DATA -> ', data)
      dispatch(addCartAction(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const deleteItem = (productId, orderId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/carts/${productId}/${orderId}`)
      dispatch(removeCartAction(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const clearCart = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/carts/${userId}`)
      dispatch(clearCartAction(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

// Reducer
const initialState = []
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.item]
    case DELETE_ITEM:
      return state.cart.filter((item) => item.id !== action.id)
    case CLEAR_CART:
      return initialState
    default:
      return state
  }
}
