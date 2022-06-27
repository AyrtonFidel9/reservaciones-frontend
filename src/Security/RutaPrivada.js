import React from 'react';
import { useCookies, Cookies } from "react-cookie";
import { Navigate, Outlet} from 'react-router-dom';


const PrivateRoute = () =>{
    const cookie = new Cookies();
    const [cookies, setCookies] = useCookies(cookie);
    console.log(cookies["my-token"]);
    return cookies["my-token"] ? <Outlet/> : 
        <Navigate to="/login"/>
}


export default PrivateRoute;