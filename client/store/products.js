import axios from 'axios'

// Action Types

const GET_PRODUCTS = 'GET_PRODUCTS'
const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

// Action Creators

export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const filterProducts = (products, filterBy) => ({
  type: FILTER_PRODUCTS,
  products,
  filterBy
})
// Thunk Creators

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

// Reducer
const initialState = []
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case FILTER_PRODUCTS:
      return action.products.filter(product => {
        if (
          product.designType === action.filterBy ||
          product.color === action.filterBy
        )
          return product
      })
    default:
      return state
  }
}
