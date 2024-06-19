import React, { useState } from 'react'
import style from './Account.module.css'
import { updateUser } from '../../../services/operations/userAPI'
import { getResetPasswordLink } from '../../../services/operations/authAPI'

const ManageAccount = ({setPageType, user}) => {
    const emptyFormObj = {
        fullname: user?.fullname,
        email: user?.email,
    }
    const [formData, setFormData] = useState(emptyFormObj)

    // const navigate = useNavigate();
    // const dispatch = useDispatch();


    const handlePasswordChange = ()=>{
        getResetPasswordLink(formData.email)
    }
    const handleSubmit = (e) => {
        if(user?.fullname !== formData.fullname) {
            updateUser(formData, setPageType);
        }
    }
    const goBack = ()=>{
        setPageType(null);
    }

    const changeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div className={style.Login}>

            <h2>Manage Account</h2>

            <div>
                <h4>fullname</h4>
                <div>
                    <input type='text' name='fullname' value={formData.fullname} onChange={(e) => changeHandler(e)} />
                </div>
            </div>
            <div>
                <h4>email</h4>
                <div>
                    <input type='email' disabled name='email' value={formData.email} onChange={(e) => changeHandler(e)} />
                </div>
            </div>

            <button className={style.btn} onClick={handlePasswordChange}>Request Password Change</button>
            <button className={style.btn} onClick={handleSubmit}>Update User</button>
            <button className={style.btn} onClick={goBack}>Go Back</button>
        </div>
    )
}

export default ManageAccount