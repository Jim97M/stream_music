import React, {useEffect} from "react";
import Navigation from '../components/Navigation';
import { connect } from "react-redux";
import { checkAuthenticated, load_users } from "../redux/actions/auth";


const Layout = ({checkAuthenticated, load_users, children}) => {
    useEffect(() => {
        checkAuthenticated(),
        load_users()
    }, []);

    return(
        <div>
            <Navigation />
            {children}
        </div>
    )
}

export default connect(null, {checkAuthenticated, load_users}) (Layout); 