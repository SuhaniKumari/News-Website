import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import { useSearchParams } from 'react-router-dom'
import { getAllNews } from '../../services/operations/newsAPI';
import NewsTile from '../../components/common/NewsTile/NewsTile';
import Pagination from '../../components/common/Pagination/Pagination';

const Home = () => {
    const [news, setNews] = useState([]);
    const [pagination, setPagination] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        getAllNews(setNews, setPagination, {page: searchParams.get('page')});
    }, [searchParams])

    return (
        <div className={style.Home}>
            {
                news.length <= 0 ?
                    <div>
                        No News found
                    </div> :
                    <div className={style.news}>
                        {news.map((n, index) => {
                            return <NewsTile key={index} data={n} />
                        })}
                    </div>
            }
            {
                news.length > 0 &&
                <Pagination pageData={pagination} />
            }
        </div>
    )
}

export default Home