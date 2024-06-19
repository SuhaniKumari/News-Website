import React, { useEffect, useState } from 'react'
import style from './Account.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLogin, setToken, setUser } from '../../../slices/userSlice';
import ManageAccount from './ManageAccount';
import { getVerifyLink } from '../../../services/operations/authAPI';
import { createRequest } from '../../../services/operations/userAPI';
import ManageNews from './ManageNews';
import ManageUsers from './ManageUsers';
import ManageEditor from './ManageEditor';
import ManageRequests from './ManageRequests';
import ManageCategories from './ManageCategories';

const Options = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state=>state.user)
    
    const [role, setRole] = useState(user?.role);
    const [verified, setVerified] = useState(user?.verified);
    const [pageType, setPageType] = useState(null);

    const logout = ()=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(setIsLogin(false));
        localStorage.removeItem("loggedIn");
    }
    const requestVerification =()=>{
        getVerifyLink();
    }
    const requestCreator = ()=>{
        createRequest()
    }

    useEffect(()=>{
        if(user){
            setRole(user.role);
            setVerified(user.verified);
        }
    }, [user])

    if(pageType === 'manageAccount'){
        return <ManageAccount setPageType={setPageType} user={user}/>
    }
    if(pageType === 'manageNews'){
        return <ManageNews setPageType={setPageType} />
    }
    if(pageType === 'manageUsers'){
        return <ManageUsers setPageType={setPageType}/>
    }
    if(pageType === 'manageCreators'){
        return <ManageEditor setPageType={setPageType}/>
    }
    if(pageType === 'manageRequests'){
        return <ManageRequests setPageType={setPageType}/>
    }
    if(pageType === 'manageCategories'){
        return <ManageCategories setPageType={setPageType}/>
    }


    return (
        <div className={style.Options}>
            <h1>Dashboard</h1>
            <div>
                <button className={style.btn} onClick={()=>setPageType('manageAccount')}>Manage Account</button>
                { (role === 'creator' || role === 'admin') && <button className={style.btn} onClick={()=>setPageType('manageNews')}>Manage News</button>}
                { role === 'viewer' && (verified ? <button className={style.btn} onClick={requestCreator}>Apply for Creator</button> : <button className={style.btn} onClick={requestVerification}>Request for verification</button>)}
                { role === 'admin' && <button className={style.btn} onClick={()=>setPageType('manageUsers')}>Manage Users</button>}
                { role === 'admin' && <button className={style.btn} onClick={()=>setPageType('manageCreators')}>Manage Creators</button>}
                { role === 'admin' && <button className={style.btn} onClick={()=>setPageType('manageRequests')}>View Request</button>}
                { role === 'admin' && <button className={style.btn} onClick={()=>setPageType('manageCategories')}>Manage Categories</button>}
                <button className={style.btn} onClick={logout}>Logout</button>

            </div>
        </div>
    )
}

export default Options