import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';
import {reset_password} from '../redux/actions/auth';

const ResetPassword = ({reset_password}) => {
    const [reset, setReset] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
      e.preventDefault();
      reset_password(email);
      setReset(true);
    }

    if(reset){
        return <Redirect to='/'/>
    }

    return(
        <div className="container mt-5">
            <h1> Request Password Reset:</h1>
            <form onSubmit={e => onSubmit(e)} >
                <div>
                 <input
                  className='form-control'
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  required
                 />
                </div>
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null, {reset_password})(ResetPassword);
