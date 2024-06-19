import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaXmark } from 'react-icons/fa6';
import longLogo from '../../../assets/images/longLogo.svg';
import style from './Header.module.css'
import { getToken } from '../../../services/operations/userAPI';
import { IoLogIn, IoMenu } from "react-icons/io5";
import { getCategories, getRegions } from '../../../services/operations/categoryAPI';
import Sidebar from './Sidebar';
import Marquee from "react-fast-marquee";

const Header = () => {
    const { isLogin, user } = useSelector((state) => state.user);
    const { categories, regions, breakingNews } = useSelector((state) => state.category);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [category, setCategory] = useState(null);
    const [region, setRegion] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showCross, setShowCross] = useState(true);

    useEffect(() => {
        if (isLogin) {
            getToken(dispatch);
        }
        if (!categories) {
            getCategories(dispatch)
        }
        if (!regions) {
            getRegions(dispatch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearch = () => {
        let query = "/search/?";
        if (category) {
            query += `category=${category}&`;
        }
        if (region) {
            query += `region=${region}&`;
        }

        navigate(query);
    }

    const sideData = {
        setShow: setShowSidebar,
        setCat: setCategory,
        setReg: setRegion,
        show: showSidebar,
        search: handleSearch,
        cat: category,
        reg: region
    }

    return (
        <div className={style.Header}>
            {(!user || user.role === 'viewer') && showCross && <div className={style.popup}>
                <h3>Be a creator</h3>
                <button onClick={() => navigate('/myaccount')}>Join Now !!!</button>
                <FaXmark onClick={() => setShowCross(false)} />
            </div>}
            <Sidebar sidebarData={sideData} />
            <div className={style.top}>
                <img onClick={() => navigate('/')} src={longLogo} alt='logo' />
                <div className={style.search}>
                    <div>
                        <select id='category' name='category' defaultValue={'none'} onChange={(e) => setCategory(e.target.value)}>
                            <option value={"none"} disabled> Select Category</option>
                            {
                                categories && categories.map((cat, index) => {
                                    return <option key={index} value={cat._id}>{cat.category}</option>
                                })
                            }
                        </select>
                        <select id='city' name='city' defaultValue={'none'} onChange={(e) => setRegion(e.target.value)}>
                            <option value={"none"} disabled> Select Region</option>
                            {
                                regions && regions.map((reg, index) => {
                                    return <option key={index} value={reg._id}>{reg.region}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <button onClick={handleSearch}>Search</button>
                        <IoLogIn onClick={() => navigate('/login')} />
                    </div>
                </div>
                <div className={style.sidebarBtn}>
                    <IoMenu onClick={() => setShowSidebar(!showSidebar)} />
                </div>
            </div>
            <div className={style.category}>
                <button onClick={() => navigate('/')}>All</button>
                {categories && categories.map((cat, index) => { return <button key={index} onClick={() => navigate(`/search/?category=${cat._id}`)}>{cat.category}</button> })}
            </div>
            {breakingNews && <div className={style.breakingNews}>
                <p>Breaking News: </p>
                <h4>
                    <Marquee pauseOnHover={true}>
                        {breakingNews}
                    </Marquee>
                </h4>
            </div>}
        </div>
    )
}

export default Header