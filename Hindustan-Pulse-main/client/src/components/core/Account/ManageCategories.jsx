import React, { useEffect, useState } from 'react'
import style from './Account.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { FaPen, FaXmark } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import { createCategory, createRegion, deleteCategory, deleteRegion, updateCategory, updateRegion } from '../../../services/operations/categoryAPI';

const ManageCategories = ({ setPageType }) => {
    const { categories, regions } = useSelector((state) => state.category);
    const [loader, setLoader] = useState(categories ? false : true);
    const [select, setSelect] = useState('category');
    const [value, setValue] = useState('');

    const dispatch = useDispatch();

    const handle = () => {
        if (select === 'category') {
            createCategory(value, dispatch);
        } else {
            createRegion(value, dispatch);
        }
    }

    useEffect(() => {
        setValue('');
    }, [select])
    useEffect(() => {
        setValue('');
        setLoader(categories ? false : true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories])

    return (
        <div className={style.Manage}>
            <h1>Manage Categories</h1>
            <div>
                <div className={style.twoOptions}>
                    <button className={style.btn} onClick={() => setPageType(null)}>Go Back</button>
                </div>
                <div className={style.twoOptions}>
                    <button className={`${style.btn} ${select === 'category' && style.selectedBtn}`} onClick={() => setSelect('category')}>Category</button>
                    <button className={`${style.btn} ${select === 'region' && style.selectedBtn}`} onClick={() => setSelect('region')}>Region</button>
                </div>
                <div className={style.addingNew}>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder={`Enter ${select} name...`} />
                    <button className={style.btn} onClick={handle}>{select === 'category' ? 'Add Category' : 'Add Region'}</button>
                </div>
                {
                    loader ? <div className={style.loaderBg}>Loading</div> :
                        (
                            select === 'category' ?
                                categories?.length === 0 ? <div className={style.loaderBg}>No Category Found</div> :
                                    categories.map((cat, index) => (<ViewCategory key={index} category={cat} />)) :
                                regions?.length === 0 ? <div className={style.loaderBg}>No Region Found</div> :
                                    regions.map((reg, index) => (<ViewRegion key={index} region={reg} />))
                        )
                }
            </div>
        </div>
    )
}


const ViewCategory = ({ category, type }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(category.category);

    const dispatch = useDispatch();

    const handleUpdate = () => {
        updateCategory(category._id, value, dispatch, setIsEdit)
    }
    const handleDelete = () => {
        deleteCategory(category._id, dispatch);
    }

    return <div className={style.singleCategory}>
        <div style={{ flexGrow: '1' }}>
            {isEdit ? <input type='text' value={value} onChange={(e) => setValue(e.target.value)} /> : <h2>{category.category}</h2>}
        </div>
        {isEdit ? <div>
            <FaCheckCircle onClick={handleUpdate} />
            <FaXmark onClick={() => setIsEdit(false)} />
        </div> :
            <div>
                <FaPen onClick={() => setIsEdit(true)} />
                <MdDelete onClick={handleDelete} />
            </div>}
    </div>
}

const ViewRegion = ({ region, type }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(region.region);

    const dispatch = useDispatch();

    const handleUpdate = () => {
        updateRegion(region._id, value, dispatch, setValue);
    }
    const handleDelete = () => {
        deleteRegion(region._id, dispatch);
    }

    return <div className={style.singleCategory}>
        <div style={{ flexGrow: '1' }}>
            {isEdit ? <input type='text' value={value} onChange={(e) => setValue(e.target.value)} /> : <h2>{region.region}</h2>}
        </div>
        {isEdit ? <div>
            <FaCheckCircle onClick={handleUpdate} />
            <FaXmark onClick={() => setIsEdit(false)} />
        </div> :
            <div>
                <FaPen onClick={() => setIsEdit(true)} />
                <MdDelete onClick={handleDelete} />
            </div>}
    </div>
}


export default ManageCategories