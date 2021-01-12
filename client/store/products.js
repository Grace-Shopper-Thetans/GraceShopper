import axios from 'axios'

// Action Types

const GET_PRODUCTS = 'GET_PRODUCTS'

// Action Creators

export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
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
    default:
      return state
  }
}
