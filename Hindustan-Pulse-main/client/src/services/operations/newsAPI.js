import { newsEndpoints } from "../apis"
import { apiConnector } from '../apiConnector'
import { toast } from 'react-hot-toast'

const { GET_ALL_NEWS, GET_NEWS, GET_MY_NEWS, CREATE_NEWS, UPDATE_NEWS, DELETE_NEWS } = newsEndpoints;

export const getAllNews = async (setNews, setPagination, data) => {
    // const toastId = toast.loading('Getting All News')
    try {
        const response = await apiConnector('GET', GET_ALL_NEWS, null, null, data);

        if(response.data.success){
            // toast.dismiss(toastId);
            // toast.success(response.data.message)
            setNews(response.data.news);
            setPagination(response.data.pagination);
        }
    } catch (err) {
        // toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const getNews = async (id, setNews, navigate) => {
    const toastId = toast.loading('Getting News...')
    try {
        const response = await apiConnector('GET', GET_NEWS, null, null, { id: id });
        if(response.data.success){
            toast.dismiss(toastId);
            toast.success(response.data.message)
            setNews(response.data.news);
        }
    } catch (err) {
        navigate('/')
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const getMyNews = async (setter) => {
    const toastId = toast.loading('Fetching my news...')
    try {
        const response = await apiConnector('POST', GET_MY_NEWS);

        if(response.data.success){
            toast.dismiss(toastId);
            toast.success(response.data.message)
            setter(response.data.news);
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const createNews = async (data, setter) => {
    const toastId = toast.loading('Creating News...')
    try {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('region', data.region);

        data.paragraphs.forEach((paragraph) => {
            formData.append('paragraphs[]', paragraph);
        });

        data.images.forEach((image) => {
            formData.append('images[]', image);
        });
        const response = await apiConnector('POST', CREATE_NEWS, formData, { 'Content-Type': 'multipart/form-data' });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message)
            setter(null);
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const updateNews = async (data, setter) => {
    const toastId = toast.loading('Updating News...')
    try {

        const formData = new FormData();

        formData.append('id', data.id);
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('region', data.region);

        data.paragraphs.forEach((paragraph) => {
            formData.append('paragraphs[]', paragraph);
        });

        data.images.forEach((image) => {
            formData.append('images[]', image);
        });
        const response = await apiConnector('PUT', UPDATE_NEWS, formData, { 'Content-Type': 'multipart/form-data' });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message)
            setter(null);
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const deleteNews = async (id, setter) => {
    const toastId = toast.loading('Deleting News...')
    try {
        const response = await apiConnector('DELETE', DELETE_NEWS, { id: id });

        console.log(response);

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message)
            setter(null)
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}