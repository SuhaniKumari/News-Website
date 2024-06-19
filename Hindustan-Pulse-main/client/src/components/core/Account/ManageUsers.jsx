import React, { useEffect, useState } from 'react'
import style from './Account.module.css'
import { banUser, deleteUser, getAllUsers } from '../../../services/operations/userAPI';
import ViewUsers from '../../common/ViewUsers/ViewUsers';

const ManageUsers = ({ setPageType }) => {
    const [trigger, setTrigger] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getAllUsers(setAllUsers);
    }, [trigger])
    useEffect(() => {
        setLoader(false);
    }, [allUsers])

    const handleBlock = (user, type) => {
        if (type === 'delete') {
            deleteUser(user._id, setTrigger, trigger);
        }
        if (type === 'ban') {
            banUser(user._id, setTrigger, trigger);
        }
    }


    return (
        <div className={style.Manage}>
            <h1>Manage Users</h1>
            <div>
                <div className={style.twoOptions}>
                    <button className={style.btn} onClick={() => setPageType(null)}>Go Back</button>
                </div>
                {
                    loader ? <div className={style.loaderBg}>Loading</div> : (
                        allUsers?.length === 0 ? <div className={style.loaderBg}>No User Found</div> :
                            <ViewUsers users={allUsers} type={'viewer'} handler={handleBlock} />)
                }
            </div>
        </div>
    )
}

export default ManageUsers