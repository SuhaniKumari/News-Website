import React from 'react'
import style from './ViewUsers.module.css'
import { FaArrowAltCircleDown, FaCheckCircle } from 'react-icons/fa'
// import { convertDate } from '../../../utils/helper'
import { FaBan, FaCircleXmark } from 'react-icons/fa6'

const ViewUsers = ({ users, type, handler }) => {
    return (
        <div className={style.ViewUsers}>
            {
                users.map((user, index) => <div className={style.singleUser} key={index}>
                    <h2>{user.email}</h2>
                    {/* {type !== 'request' && <h3>{convertDate(user.createdAt)}</h3>} */}
                    <h3>{user.userType}</h3>
                    <div>
                        {type === 'viewer' && <FaBan onClick={() => handler(user, 'ban')} />}
                        {type === 'viewer' && <FaCircleXmark onClick={() => handler(user, 'delete')} />}
                        {type === 'request' && <FaCheckCircle onClick={() => handler(user, 'accept')} />}
                        {type === 'request' && <FaCircleXmark onClick={() => handler(user, 'decline')} />}
                        {type === 'editor' && <FaArrowAltCircleDown onClick={() => handler(user)} />}
                    </div>
                </div>)
            }
        </div>
    )
}

export default ViewUsers