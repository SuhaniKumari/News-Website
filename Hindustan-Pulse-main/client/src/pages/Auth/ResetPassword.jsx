import React, { useEffect, useState } from 'react'
import style from './Auth.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { resetPassword } from '../../services/operations/authAPI';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
    const [changed, setChanged] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useParams();

    const handleSubmit = () => {
        if(password !== confirmPassword){
            toast.error('Password does not match');
            return;
        }
        if(password.length < 8){
            toast.error('Password must be greator than 8 letters');
            return;
        }
        resetPassword(token, confirmPassword, setChanged, dispatch)
    }

    useEffect(()=>{
        if(!token || token.length === 0){
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (changed) {
        return (<div className={style.Verification}>
            <h2>Successfully Changed the Password</h2>
            <button onClick={() => navigate('/login')}>Go to Signup Page</button>
        </div>)
    }


    return (<div className={style.Verification}>
        <h2>{"Reset Password"}</h2>

        <div>
            <h4>password</h4>
            <div>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                {showPassword ? <FaRegEye onClick={() => setShowPassword(false)} /> : <FaRegEyeSlash onClick={() => setShowPassword(true)} />}
            </div>
        </div>
        <div>
            <h4>Confirm Password</h4>
            <div>
                <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {showConfirmPassword ? <FaRegEye onClick={() => setShowConfirmPassword(false)} /> : <FaRegEyeSlash onClick={() => setShowConfirmPassword(true)} />}
            </div>
        </div>
        <button className={style.btn} onClick={handleSubmit}>{"Reset Password"}</button>
    </div>)
}

export default ResetPassword