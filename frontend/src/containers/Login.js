import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../redux/actions';
import axios from 'axios';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = e =>{
        e.preventDefault();
        login(email, password);
    }

    if(isAuthenticated){
       return <Redirect to="/" />
    }

    return(
        <div className="container mt-5" >
           <h1>Sign In</h1>
           <p>Sign Into Your Account</p>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
             className="form-control"
             type='email'
             placeholder='Email'
             onChange={e =>onChange()}
             value={email}
             name='email'
             required
            />
            </div>
             <div className="form-group">
              <input
               className="form-control"
               type='password'
               placeholder='Password'
               onChange={e =>onChange()}
               value={password}
               name='password'
               minLength='6'
               required
             />
           </div>
             <button className='btn btn-primary' type='submit'>Login</button>
           </form>

           <p className="mt-3">
             Don't Have an Account? <Link to="/signup"> Sign Up</Link>
           </p>

           <p className="mt-3">
              Forgot Password? <Link to="/reset-password">Reset Password</Link>
          </p>
        </div>


    );
};

const mapStateToProps = state => {
    isAuthenticated: state.auth.isAuthenticated;
};


export default connect(mapStateToProps, {login}) (Login);
