import React, { useEffect, useState } from 'react'
import style from './Auth.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyAccount } from '../../services/operations/authAPI'

const Verification = () => {
    const [loader, setLoader] = useState(true)

    const navigate = useNavigate();

    const { token } = useParams();

    useEffect(() => {
        verifyAccount(token, setLoader, navigate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (loader ? <div className={style.Verification}>
        <h1>Verifying your account</h1>
        <div className='loader' />
    </div> : <div className={style.Verification}>
        <h1>Your account is activated</h1>
        <button onClick={() => navigate('/login')}>Go to Dashboard</button>
    </div>)

}

export default Verification