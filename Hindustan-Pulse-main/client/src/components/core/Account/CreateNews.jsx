import React, { useEffect, useRef, useState } from 'react'
import style from './Account.module.css'
import { useSelector } from 'react-redux';
import { IoMdCloseCircle } from 'react-icons/io';
import { createNews, deleteNews, updateNews } from '../../../services/operations/newsAPI';
import { generateDeepCopy } from '../../../utils/helper';
import toast from 'react-hot-toast';

const CreateNews = ({ setCreate, news }) => {

    const { categories, regions } = useSelector((state) => state.category);

    const imageRef = useRef();

    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        region: 'none',
        category: 'none',
        title: "",
        paragraphs: [],
        images: [],
    })
    const [paragraph, setParagraph] = useState("");
    const [previewImages, setPreviewImages] = useState([]);

    const handleChange = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }
    const addParagraph = () => {
        if (paragraph.length !== 0) {
            const paragraphs = formData.paragraphs;
            paragraphs.push(paragraph)
            setParagraph("");
            setFormData((prev) => (
                {
                    ...prev,
                    paragraphs: paragraphs
                }
            ))
        }
    }
    const addImage = (file) => {
        if (file) {
            const images = formData.images;
            images.push(file)
            setFormData((prev) => (
                {
                    ...prev,
                    images: images
                }
            ))
        }
    }
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            addImage(file);
            setPreviewImages((prev) => ([...prev, reader.result]))
        }
    }
    const removeImage = (index) => {
        if (index >= 0) {
            let images = previewImages
            previewImages.splice(index, 1);
            setPreviewImages(images);
            images = formData.images;
            images.splice(index, 1);
            setFormData((prev) => (
                {
                    ...prev,
                    images: images
                }
            ))
        }
    }
    const removeParagraph = (index) => {
        const paragraphs = formData.paragraphs;
        if (0 <= index && index <= paragraphs.length) {
            paragraphs.splice(index, 1);
            setFormData((prev) => (
                {
                    ...prev,
                    paragraphs: paragraphs
                }
            ))
        }
    }
    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) previewFile(file);
    };
    const handleCreate = () => {
        if (formData.title.length === 0) {
            toast.error("Title is required")
            return;
        }
        if (formData.images.length === 0) {
            toast.error("Atleast one image is required")
            return;
        }
        if (formData.paragraphs.length === 0) {
            toast.error("Atleast one paragraph is required")
            return;
        }
        if(formData.category === 'none'){
            toast.error("Category is required")
            return;
        }
        if(formData.region === 'none'){
            toast.error("Region is required")
            return;
        }

        createNews(formData, setCreate);
    };
    const handleDelete = () => {
        if (isEdit) {
            deleteNews(formData.id, setCreate)
        }
    };
    const handleUpdate = () => {
        updateNews(formData, setCreate);
    };

    useEffect(() => {
        if (news) {
            setIsEdit(true);
            setFormData({
                id: news._id,
                region: news.region?._id || "",
                category: news.category?._id || "",
                title: news.title,
                paragraphs: news.paragraphs,
                images: news.images,
            })
            setPreviewImages(generateDeepCopy(news.images));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={style.CreateNews}>
            {isEdit ? <h1>Update News</h1> : <h1>Create News</h1>}
            <div>
                <div className={style.twoOptions}>
                    <button className={style.btn} onClick={() => setCreate(null)}>Go Back</button>
                    {isEdit && <button className={style.btn} onClick={handleDelete}>Delete News</button>}
                </div>
                <div className={style.imageSection}>
                    <input ref={imageRef} onChange={handleImage} type='file' accept='image/*' />
                    {formData.images.length === 0 && <div onClick={() => imageRef.current.click()} className={style.tempImage}>
                        <h2>Add atleast one image</h2>
                    </div>}
                    <div>
                        {previewImages.map((image, index) => (<div key={index} className={style.imageContainer}><IoMdCloseCircle onClick={() => removeImage(index)} /><img width={'100%'} src={image} alt='newsImage' /></div>))}
                    </div>
                    {formData.images.length !== 0 && <button onClick={() => imageRef.current.click()} className={style.btn}>Add Image</button>}
                </div>
                <div className={style.detailSection}>
                    <div>
                        <select id='category' name='category' value={formData.category} onChange={handleChange}>
                            <option value={"none"} disabled> Select Category</option>
                            <option value={""} > None</option>
                            {
                                categories && categories.map((cat, index) => {
                                    return <option key={index} value={cat._id}>{cat.category}</option>
                                })
                            }
                        </select>
                        <select id='region' name='region' value={formData.region} onChange={handleChange}>
                            <option value={"none"} disabled> Select Region</option>
                            <option value={""} > None</option>
                            {
                                regions && regions.map((reg, index) => {
                                    return <option key={index} value={reg._id}>{reg.region}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <input type='text' value={formData.title} name='title' onChange={handleChange} placeholder='Enter the title... ' />
                        {
                            formData.paragraphs.map((para, index) => <div key={index} className={style.paragraphContainer}><IoMdCloseCircle onClick={() => removeParagraph(index)} /><p key={index}>{para}</p></div>)
                        }
                        <textarea onChange={(e) => setParagraph(e.target.value)} value={paragraph} placeholder='Enter the paragraph... ' />
                        <button className={style.btn} onClick={addParagraph}>Add Paragraph</button>
                    </div>
                </div>

                {isEdit ? <button className={style.btn} onClick={handleUpdate}>Update News</button> : <button className={style.btn} onClick={handleCreate}>Create News</button>}

            </div>
        </div>
    )
}

export default CreateNews