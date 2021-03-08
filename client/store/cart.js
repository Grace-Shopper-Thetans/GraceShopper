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
      dispatch(getCart(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const addToCart = (item, incDec, shallowId, _userId) => {
  return async (dispatch) => {
    try {
      let input = []
      if (item.target.value) {
        input = item.target.value.split(',')
      }
      const itemId = input[0] || shallowId
      const userId = input[1] || _userId
      const {data} = await axios.post('/api/carts/', {itemId, userId, incDec})
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

export const clearCart = (orderId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/carts/${orderId}`)
      dispatch(clearCartAction(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const completeUserOrder = async (order) => {
  let orderFromDb = await axios.post('/api/carts/userorder', order)
  return orderFromDb
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
      return state.cart
        ? state.cart.filter((item) => item.id !== action.id)
        : state
    case CLEAR_CART:
      return initialState
    default:
      return state
  }
}
