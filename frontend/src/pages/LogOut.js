import { useEffect } from "react";
import { userLogoutAction } from "../redux/actions/userAction";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'

const LogOut=()=>{


    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    useEffect(()=>{
        dispatch(userLogoutAction());
        //window.location.reload(true);
        setTimeout(() => {
            navigate('/Home');
        }, 500)
    },[])

}
export default LogOut;