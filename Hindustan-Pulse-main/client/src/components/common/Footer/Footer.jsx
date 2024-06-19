import React, { useState } from 'react'
import style from './Footer.module.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const { categories, regions } = useSelector((state) => state.category);
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);
    const [region, setRegion] = useState(null);

    const handleSearch = ()=>{
        let query = "/search/?";
        if(category){
            query += `category=${category}&`;
        }
        if(region){
            query += `region=${region}`;
        }

        navigate(query);
    }

    return (
        <div className={style.Footer}>
            <div className={style.top}>
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
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className={style.bottom}>
                <h3>©2024 <span>HindustanTime24, Patna (India)</span></h3>
                <div>
                    <h3 onClick={()=>navigate('/privacy')}>Privacy policy</h3>
                    <h3>|</h3>
                    <h3 onClick={()=>navigate('/about-us')}>About Us</h3>
                    <h3>|</h3>
                    <h3 onClick={()=>navigate('/contact-us')}>Contact Us</h3>
                </div>
            </div>
        </div>
    )
}

export default Footer