import axios from 'axios'

const GET_G_CART = 'GET_G_CART'
const ADD_G_CART = 'ADD_G_CART'

export const getGuestCart = () => {
  let gCart = null
  if (localStorage.getItem('cart') === null) {
    gCart = []
  } else {
    gCart = JSON.parse(localStorage.getItem('cart'))
  }
  return {
    type: GET_G_CART,
    gCart,
  }
}

export const addItemGuest = (item) => {
  return async (dispatch) => {
    let counter = 0
    const id = Number(item.target.value)
    const addedItem = await axios.get(`/api/products/${id}`)
    addedItem.qty = 1
    addedItem.id = id
    let currentCart = []
    if (localStorage.getItem('cart')) {
      currentCart = JSON.parse(localStorage.getItem('cart'))
      currentCart.map((cartItem) => {
        if (cartItem.id === id) {
          cartItem.qty++
          counter++
        }
      })
      if (counter === 0) {
        currentCart.push(addedItem)
      }
      localStorage.setItem('cart', JSON.stringify(currentCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([addedItem]))
    }
    dispatch(getGuestCart())
  }
}

export const removeItemGuest = (id) => {
  let currentCart = JSON.parse(localStorage.getItem('cart'))
  const gCart = currentCart.filter((a) => a.data.id !== id)
  localStorage.setItem('cart', JSON.stringify(gCart))
  return {
    type: GET_G_CART,
    gCart,
  }
}

export const completeGuestOrder = async (order) => {
  let orderFromDb = await axios.post('/api/carts/guestorder', order)
  return orderFromDb
}

export const clearGuestCart = () => {
  localStorage.setItem('cart', [])
  let gCart = []
  return {
    type: GET_G_CART,
    gCart,
  }
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
