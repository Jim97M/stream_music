import axios from 'axios';
import{
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS
}from './types';

export const signup = (first_name,last_name, email, password, re_password) => async dispatch => {
  const config = {
      headers:{
       'Content-Type':'application/json'
      }
  };

  const body = JSON.stringify({first_name,last_name, email, password, re_password});
   try{
       const res = await axios.post(`${process.env.API_URL/auth/user}`, body, config);

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
       const res = await axios.post(`${process.env.API_URL/auth/jwt/create}`, body, config);
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