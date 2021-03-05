import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getUsersAction = (users) => {
  return {type: GET_ALL_USERS, users}
}

export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await axios.get('/api/users')
      dispatch(getUsersAction(users.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
