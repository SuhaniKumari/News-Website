import React from 'react'
import style from './Account.module.css'
import { useSelector } from 'react-redux'
import Options from '../../components/core/Account/Options';
import Login from '../../components/core/Account/Login';

const Account = () => {
    const { token } = useSelector(state => state.user);    

    return (
        <div className={style.Account}>
            {
                token ? <Options /> : <Login />
            }
        </div>
    )
}

export default Account