import React, { useEffect, useState } from 'react'
import style from './Account.module.css'
import { cancleRequest, getAllUsers, promoteUser } from '../../../services/operations/userAPI';
import ViewUsers from '../../common/ViewUsers/ViewUsers';

const ManageRequests = ({ setPageType }) => {
    const [trigger, setTrigger] = useState(true);
    const [loader, setLoader] = useState(true);
    const [allRequests, setAllRequests] = useState([]);

    useEffect(()=>{
        getAllUsers(setAllRequests, 'request');
    }, [trigger]);
    useEffect(()=>{
        setLoader(false);
    }, [allRequests])

    const handle = (user, type)=>{
        if(type === 'accept'){
            promoteUser(user._id, setTrigger, trigger);
        }
        if(type === 'decline'){
            cancleRequest(user._id, setTrigger, trigger);
        }
    }

    

    return (
        <div className={style.Manage}>
            <h1>Manage Requests</h1>
            <div>
                <div className={style.twoOptions}>
                    <button className={style.btn} onClick={() => setPageType(null)}>Go Back</button>
                </div>
                {
                    loader ? <div className={style.loaderBg}>Loading</div> : (
                        allRequests?.length === 0 ? <div className={style.loaderBg}>No Request Found</div> :
                            <ViewUsers users={allRequests} type={'request'} handler={handle} />)
                }
            </div>
        </div>
    )
}

export default ManageRequests