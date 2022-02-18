import React, {useState} from 'react'
import {Link, Redirec} from 'react-router-dom';
import { connect } from 'react-redux';
import {signup} from '../redux/actions/auth';

const SignUp = () => {
    const [accountCeated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        'first_name': '',
        'last_name': '',
        'email': '',
        'password': '',
        're_password':'',
    });

    const {name, email, password, re_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.value] : e.target.value});
    
    const onSubmit = e => {
        e.preventDefault();
        
        if(password === re_password){
            signup(first_name, last_name , email, password, re_password);
        }

        setAccountCreated(true);
    }

    if(isAuthenticated){
        return <Redirect to="/" />
    }

    if(accountCeated){
        return <Redirect to="/login" />
    }

  return (
    <div className="container mt-3">
      <form onSubmit = {e => onSubmit(e)}>
          <div className="form-group">
            <input
             name="first_name"
             type="name"
             value={name}
             placeholder="Name"
             onChange = {e => onChange(e)}
            />
           <input
             name="last_name"
             type="name"
             value={name}
             placeholder="Name"
             onChange = {e => onChange(e)}
            />
           <input
             name="email"
             type="email"
             value={email}
             placeholder="Email"
             onChange = {e => onChange(e)}
            />
           <input
             name="password"
             type="password"
             value={password}
             placeholder="Password"
             onChange = {e => onChange(e)}
             minLength = '6'
             required
            />
           <input
             name="re_password"
             type="password"
             value={re_password}
             placeholder="Confirm Password"
             onChange = {e => onChange(e)}
             minLength = '6'
             required
            />
          </div>
          <button className="btn btn-primary" type="submit">Sign Up</button>
      </form>
      <p>Already Have an Account</p> <Link to="/login"> Login </Link>
    </div>
  );
};

const mapStateToProps = state => {
    isAuthenticated: state.auth.isAuthenticated
};

export default connect(mapStateToProps, {signup})(SignUp);
