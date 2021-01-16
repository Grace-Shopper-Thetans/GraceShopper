import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const GET_USER_ORDER = 'GET_USER_ORDER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => {
  return {
    type: UPDATE_USER,
    user
  }
}
const getUserOrder = (user, orders) => {
  return {type: GET_USER_ORDER, user, orders}
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchUpdateUser = user => {
  return async dispatch => {
    try {
      const userData = await axios.put(`/api/users/${user.id}`, user)
      const updatedUser = JSON.parse(userData.config.data)
      dispatch(updateUser(updatedUser))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchUserOrder = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}`)
      dispatch(getUserOrder(data, data.orders))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    case GET_USER_ORDER:
      return {...action.user, orders: [action.orders]}
    default:
      return state
  }
}
