import axios from 'axios';
import{
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL, 
  LOGOUT,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL
}from './types';


export const signup = (first_name,last_name, email, password, re_password) => async dispatch => {
  const config = {
      headers:{
       'Content-Type':'application/json'
      }
  };

  const body = JSON.stringify({first_name,last_name, email, password, re_password});
   try{
       const res = await axios.post(`${process.env.API_URL}/auth/user`, body, config);

       dispatch({
           type: SIGNUP_SUCCESS,
           payload: res.data;
       })
   }catch(err){
       dispatch({
       type: SIGNUP_FAIL
    })
   }
} 

export const login = (email, password) => async dispatch => {
   const config = {
       headers:{
           'Content-Type': 'application/json',
       }
   }

   const body = JSON.stringify({emai, password});
   try {
       const res = await axios.post(`${process.env.API_URL}/auth/jwt/create`, body, config);
       dispatch({
           type: LOGIN_SUCCESS,
           payload: res.data
       })
   } catch (err) {
       dispatch({
           type: LOGIN_FAIL
       })
   }
}

export const verify = ({uid, token}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({uid, token});

    try {
        await axios.post(`${process.env.API_URL}/auth/users/activation`, body, config);
        dispatch({
            type:ACTIVATION_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type:ACTIVATION_FAIL,
        })
    }
}

export const reset_password = (email) => async dispatch => {
         const config = {
             'Content-Type': 'application/json';
         }

         const body = JSON.stringify({email});
         try {
             await axios.post(`${process.env.API_URL}/auth/users/reset_password`, body, config);
             dispatch({
                 type: PASSWORD_RESET_SUCCESS,
             })
         } catch (err) {
             dispatch({
                type: PASSWORD_RESET_FAIL,
             })
         }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        'Content-Type': 'application/json';
    }

    const body = JSON.stringify({email});
    try {
        await axios.post(`${process.env.API_URL}/auth/users/reset_password/`, body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        })
    } catch (err) {
        dispatch({
           type: PASSWORD_RESET_FAIL,
        })
    }
}


export const reset_password_confirm = ({uid, token, new_password, re_new_password}) => async dispatch => {
    const config = {
        'Content-Type': 'application/json';
    }

    const body = JSON.stringify({uid, token, new_password, re_new_password});
    try {
        await axios.post(`${process.env.API_URL/auth/users/}reset_password_confirm/`, body, config);
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        })
    } catch (err) {
        dispatch({
           type: PASSWORD_RESET_CONFIRM_FAIL,
        })
    }
}


export const load_users = () => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
            headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
         }
        }

    try{
       const res = axios.get(`${process.env.API_URL}/auth/users/me`, config);
        dispatch({
           type: USER_LOAD_SUCCESS,
           payload: res.data
        })
      }catch(err){
       dispatch({
          type: USER_LOAD_FAIL,
      })
    }
  }else{
    dispatch({
        type: USER_LOAD_FAIL,
    }) 
  }
} 

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}