import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  AUTHENTICATION_FAIL,
  AUTHENTICATION_SUCCESS,
  LOGOUT
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    user: null
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    
    switch(type){
      case AUTHENTICATION_SUCCESS:
        return{
          ...state,
          isAuthenticated: true
        }

      case LOGIN_SUCCESS:

      case SIGNUP_SUCCESS:
        return{
          ...state,
          isAuthenticated: false
        }

      case USER_LOAD_SUCCESS:
        return{
          ...state,
          user: payload
        }
    

      case AUTHENTICATION_FAIL:
        return{
          ...state,
          isAuthenticated: false
        } 

      case USER_LOAD_FAIL:
        return{
          ...state,
          user: null
        }


     case PASSWORD_RESET_CONFIRM_FAIL:
     case PASSWORD_RESET_CONFIRM_SUCCESS:
     case PASSWORD_RESET_FAIL:
     case PASSWORD_RESET_SUCCESS:
     case ACTIVATION_SUCCESS: 
     case ACTIVATION_FAIL:
        return{
          ...state
        } 
        default:
          return state
  
      case LOGOUT:
        localStorage.removeItem('access'),
        localStorage.removeItem('refresh')

        return{
          ...state,
          access: null,
          refresh: null,
          isAuthenticated: false,
          user: null
        }

}
}