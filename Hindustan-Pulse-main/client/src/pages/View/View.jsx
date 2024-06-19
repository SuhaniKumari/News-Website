import React, { useEffect, useState } from 'react'
import style from './View.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getNews } from '../../services/operations/newsAPI';
import ViewBox from '../../components/core/ViewBox/ViewBox'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const View = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const newsId = searchParams.get('news');
    if (!newsId) {
        navigate('/');
    }

    const [loader, setLoader] = useState(true);
    const [news, setNews] = useState(null);

    useEffect(() => {
        if (newsId) {
            getNews(newsId, setNews, navigate);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(()=>{
        if(news){
            setLoader(false);
        }
    }, [news]);

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        objectFit: 'contain',
        maxWidth: '100%'
    }
    const parentStyle = {
        width: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        height: "100%",
    }

    if (loader) {
        return <div>Loader</div>
    }

    return (
        <div className={style.View}>
            <div>
                <div>
                    <Slide>
                        {news.images.map((slideImage, index) => (
                            <div key={index} style={parentStyle}>
                                <img style={divStyle} src={slideImage} alt='newsImages'/>
                            </div>
                        ))}
                    </Slide>
                </div>
            </div>
            <ViewBox news={news} />
        </div>
    )
}

export default View