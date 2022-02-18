import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import activate from '../redux/actions/auth';
import {verify} from '../redux/actions/auth';

const Activate = ({verify, match}) => {
    const [verified, setVerified] = useState(false);


    const verify_account = e => {
        const  uid = match.params.uid;
        const  token = match.params.token;
    
        verify(uid, token);

        setVerified(true);
    }

    if(verified){
       return <Redirect to='/'/>
    }

    return(
      <div className="container">
          <div className='d-flex flex-column justify-content-center align-items-center'>
              <button 
               className='btn btn-primary'
               onClick={verify_account}
               style={{marginTop: '50px'}}
               type='button'>
                 Verify
              </button>
          </div>
      </div>
    );
};

export default connect(null, {verify})(Activate);