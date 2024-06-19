import React, { useEffect, useState } from 'react'
import style from './Account.module.css'
import ViewUsers from '../../common/ViewUsers/ViewUsers';
import { demoteUser, getAllUsers } from '../../../services/operations/userAPI';

const ManageEditor = ({setPageType}) => {
    const [trigger, setTrigger] = useState();
    const [loader, setLoader] = useState(true);
    const [allEditors, setAllEditors] = useState([]);

    const handleDemote = (user)=>{
        demoteUser(user._id, setTrigger, trigger);
    }

    useEffect(()=>{
        getAllUsers(setAllEditors, 'creator');
    }, [trigger]);
    useEffect(()=>{
        setLoader(false);
    }, [allEditors]);

    return (
        <div className={style.Manage}>
            <h1>Manage Creators</h1>
            <div>
                <div className={style.twoOptions}>
                    <button className={style.btn} onClick={() => setPageType(null)}>Go Back</button>
                </div>
                {
                    loader ? <div className={style.loaderBg}>Loading</div> : (
                        allEditors?.length === 0 ? <div className={style.loaderBg}>No Creator Found</div> :
                            <ViewUsers users={allEditors} type={'editor'} handler={handleDemote} />)
                }
            </div>
        </div>
    )
}

export default ManageEditor