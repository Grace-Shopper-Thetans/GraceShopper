import axios from 'axios'

// Action Types

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// Action Creators

export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addCartAction = item => ({
  type: ADD_TO_CART,
  item
})

// Thunk Creators

export const fetchCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/carts/${id}`)
      dispatch(getCart(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const addToCart = item => {
  return async dispatch => {
    try {
      const id = item.target.value
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(addCartAction(data))
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
      return action.product
    case ADD_TO_CART:
      return [...state, action.item]
    default:
      return state
  }
}
