import React, { useEffect, useState } from 'react'
import style from './Search.module.css'
import { useSearchParams } from 'react-router-dom';
import { getAllNews } from '../../services/operations/newsAPI';
import NewsTile from '../../components/common/NewsTile/NewsTile';
import Pagination from '../../components/common/Pagination/Pagination';

const Search = () => {
    const [news, setNews] = useState([]);
    const [pagination, setPagination] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const query = { page: searchParams.get('page'), category: searchParams.get('category'), region: searchParams.get('region') };
        getAllNews(setNews, setPagination, query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    return (
        <div className={style.Search}>
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

export default Search