import React, { useRef } from 'react'
import style from './Header.module.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoCloseSharp } from 'react-icons/io5'
import useOnClickOutside from '../../../hooks/useOnClickOutside'

const Sidebar = ({ sidebarData }) => {
    const { categories, regions } = useSelector((state) => state.category)
    const { user } = useSelector((state) => state.user);

    const { setShow, setCat, setReg, show, search } = sidebarData;

    const mainRef = useRef();
    useOnClickOutside(mainRef, ()=>setShow(false));

    const navigate = useNavigate();

    return (
        <div ref={mainRef} className={`${style.Sidebar} ${show ? style.show : style.hide}`}>
            <div>
                <div>
                    <IoCloseSharp onClick={() => setShow(!show)} />
                    <select id='category' name='category' defaultValue={'none'} onChange={(e) => setCat(e.target.value)}>
                        <option value={"none"} disabled> Select Category</option>
                        {
                            categories && categories.map((cat, index) => {
                                return <option key={index} value={cat._id}>{cat.category}</option>
                            })
                        }
                    </select>
                    <select id='city' name='city' defaultValue={'none'} onChange={(e) => setReg(e.target.value)}>
                        <option value={"none"} disabled> Select Region</option>
                        {
                            regions && regions.map((reg, index) => {
                                return <option key={index} value={reg._id}>{reg.region}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <button onClick={() => { setShow(!show); search() }}>Search</button>
                </div>
            </div>
            <div>
                {
                    user ? <button onClick={() => { setShow(!show); navigate('/myaccount') }}>Dashboard</button> : <button onClick={() => { setShow(!show); navigate('/login') }}>Login</button>
                }
            </div>
        </div>
    )
}

export default Sidebar