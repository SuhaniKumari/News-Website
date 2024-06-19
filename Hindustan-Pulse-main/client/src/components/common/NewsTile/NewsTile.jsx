import React from 'react'
import style from './NewsTile.module.css'
import { useNavigate } from 'react-router-dom'
import { convertDateFormat } from '../../../utils/helper'

const NewsTile = ({data}) => {
    const navigate = useNavigate()
    return (
        <div className={style.NewsTile} onClick={()=>navigate(`/view/?news=${data._id}`)}>
            <img src={data.image} alt='newsImage'/>
            <div>
                <h2>{data.title}</h2>
                <h3>{convertDateFormat(data.publishedDate)}</h3>
                <h4>{data.paragraph}</h4>
            </div>
        </div>
    )
}

export default NewsTile