import axios from 'axios'

export default class GuestCart {}

export const addItemGuest = async item => {
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
}

export const getGuestCart = () => {
  return JSON.parse(localStorage.getItem('cart'))
}

export const clearGuestCart = () => {
  localStorage.setItem('cart', [])
}
