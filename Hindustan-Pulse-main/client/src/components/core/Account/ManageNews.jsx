import React, { useEffect, useState } from 'react'
import style from './Account.module.css'
import { getMyNews } from '../../../services/operations/newsAPI';
import { convertDateFormat, generateDeepCopy } from '../../../utils/helper';
import CreateNews from './CreateNews';

const ManageNews = ({ setPageType }) => {
    const [news, setNews] = useState(null);
    const [loader, setLoader] = useState(true);
    const [create, setCreate] = useState(false);
    const [editNews, setEditNews] = useState(null);


    useEffect(() => {
        getMyNews(setNews);
    }, [])
    useEffect(() => {
        if (news !== null) {
            setLoader(false);
        }
    }, [news]);
    useEffect(() => {
        if (editNews) {
            setCreate(true);
        }
    }, [editNews]);
    useEffect(()=>{
        if(create === null){
            setEditNews(null);
            getMyNews(setNews);
        }
    }, [create])


    if (create) {
        return <CreateNews setCreate={setCreate} news={generateDeepCopy(editNews)} />
    }

    return (
        <div className={style.ManageNews}>
            <h1>Manage News</h1>
            <div>
                <div className={style.twoOptions}>
                    <button className={style.btn} onClick={() => setPageType(null)}>Go Back</button>
                    <button className={style.btn} onClick={() => setCreate(true)}>Create News</button>
                </div>
                {
                    loader ? <div className={style.loaderBg}>Loading</div> :
                        <div className={style.allNews}>
                            {news?.length === 0 ? <div className={style.loaderBg}>No News Found</div> :
                                news.map((n, index) => <SingeNews key={index} setEditNews={setEditNews} news={n} />)}
                        </div>
                }
            </div>
        </div>
    )
}

const SingeNews = ({ news, setEditNews }) => {
    return (
        <div onClick={() => setEditNews(news)} className={style.singleNews}>
            <div>
                <h2>{news.title}</h2>
                <h3>Views: {news.views}</h3>
            </div>
            <div>
                <h4>Date: {convertDateFormat(news.publishedDate)}</h4>
                <h4>|</h4>
                <h4>Category: {news?.category?.category}</h4>
                <h4>|</h4>
                <h4>Region: {news?.region?.region}</h4>
            </div>
        </div>
    )
}

export default ManageNews