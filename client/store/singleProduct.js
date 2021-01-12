import axios from 'axios'

// Action Types

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// Action Creators

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

// Thunk Creators

export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getSingleProduct(data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

// Reducer
const initialState = {}
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
