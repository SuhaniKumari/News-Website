import React, { useEffect, useState } from 'react'
import style from './Account.module.css'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { signinUser, signupUser } from '../../../services/operations/userAPI';
import { useDispatch } from 'react-redux';
import { getResetPasswordLink } from '../../../services/operations/authAPI';

const Login = () => {
    const [pageType, setPageType] = useState('signin');
    const emptyFormObj = {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [formData, setFormData] = useState(emptyFormObj)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        if(pageType === 'signin'){
            signinUser({email: formData.email, password: formData.password}, navigate, dispatch);
        }
        if(pageType === 'signup'){
            signupUser(formData, setPageType);
        }
        if(pageType === 'reset'){
            getResetPasswordLink(formData.email);
        }
    }

    useEffect(() => {
        setFormData(emptyFormObj);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageType])

    const changeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className={style.Login}>

            {pageType === 'signin' && <h2>{"Sign In"}</h2>}
            {pageType === 'signup' && <h2>{"Sign Up"}</h2>}
            {pageType === 'reset' && <h2>{"Reset Password"}</h2>}

            {pageType === 'signup' && <div>
                <h4>fullname</h4>
                <div>
                    <input type='text' name='fullname' value={formData.fullname} onChange={(e)=>changeHandler(e)} />
                </div>
            </div>}
            <div>
                <h4>email</h4>
                <div>
                    <input type='email' name='email' value={formData.email} onChange={(e)=>changeHandler(e)} />
                </div>
            </div>
            {(pageType !== 'reset') && <div>
                <h4>password</h4>
                <div>
                    <input type={showPassword ? 'text' : 'password'} name='password' value={formData.password} onChange={(e)=>changeHandler(e)} />
                    {showPassword ? <FaRegEye onClick={() => setShowPassword(false)} /> : <FaRegEyeSlash onClick={() => setShowPassword(true)} />}
                </div>
            </div>}
            {pageType === 'signup' && <div>
                <h4>Confirm Password</h4>
                <div>
                    <input type={showConfirmPassword ? 'text' : 'password'} name='confirmPassword' value={formData.confirmPassword} onChange={(e)=>changeHandler(e)} />
                    {showConfirmPassword ? <FaRegEye onClick={() => setShowConfirmPassword(false)} /> : <FaRegEyeSlash onClick={() => setShowConfirmPassword(true)} />}
                </div>
            </div>}

            {pageType === 'signup' && <button className={style.btn} onClick={handleSubmit}>{"Sign Up"}</button>}
            {pageType === 'signin' && <button className={style.btn} onClick={handleSubmit}>{"Sign In"}</button>}
            {pageType === 'reset' && <button className={style.btn} onClick={handleSubmit}>{"Reset Password"}</button>}

            <div className={style.option}>

                {pageType !== 'signup' && <p onClick={() => setPageType('signup')}>{"Create an account"}</p>}
                {pageType !== 'signin' && <p onClick={() => setPageType('signin')}>{"Already have an account"}</p>}
                {pageType !== 'reset' && <p onClick={() => setPageType('reset')}>{"Forget your password ?"}</p>}


            </div>
        </div>
    )
}

export default Login