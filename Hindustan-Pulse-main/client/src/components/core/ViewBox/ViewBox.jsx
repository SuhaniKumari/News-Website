import React from 'react'
import style from './ViewBox.module.css'
import { convertDateFormat } from '../../../utils/helper'

const VewBox = ({ news }) => {
    const category = news.category?.category || 'All';
    const region = news.region?.region || 'All';
    return (
        <div className={`${style.Viewbox}`}>
            <h2>{news.title}</h2>
            <div>
                <h4>Date: {convertDateFormat(news.publishedDate)} | Author: {news.author.fullname}</h4>
                <h4>Category: {category} | Region: {region}</h4>
            </div>
            <div>
                {
                    news.paragraphs.map((para, index) => (
                        <div key={index}>
                            {para}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VewBox