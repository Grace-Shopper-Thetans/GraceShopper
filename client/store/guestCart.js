import axios from 'axios'

const GET_G_CART = 'GET_G_CART'
const ADD_G_CART = 'ADD_G_CART'

export const getGuestCart = () => {
  const gCart = JSON.parse(localStorage.getItem('cart'))
  return {
    type: GET_G_CART,
    gCart
  }
}

export const addItemGuest = item => {
  return async dispatch => {
    const id = item.target.value
    const addedItem = await axios.get(`/api/products/${id}`)
    let currentCart = []
    if (localStorage.getItem('cart')) {
      currentCart = JSON.parse(localStorage.getItem('cart'))
      currentCart.push(addedItem)
      localStorage.setItem('cart', JSON.stringify(currentCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([addedItem]))
    }
    dispatch(getGuestCart())
  }
}

export const clearGuestCart = () => {
  localStorage.setItem('cart', [])
}

const initialState = []
export default function guestReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_G_CART:
      return [...state, action.item]
    case GET_G_CART:
      return action.gCart

    default:
      return state
  }
}
