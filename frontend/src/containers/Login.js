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
}