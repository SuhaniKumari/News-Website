import toast from "react-hot-toast";
import { setBreakingNews, setCategories, setRegions } from "../../slices/categorySlice";
import { apiConnector } from "../apiConnector"
import { categoryEndpoints } from "../apis"

const { CREATE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, CREATE_REGION, GET_REGION, UPDATE_REGION, DELETE_REGION, } = categoryEndpoints;

export const getCategories = async (dispatch) => {
    try {
        const response = await apiConnector('GET', GET_CATEGORY);
        const data = response.data.categories;
        dispatch(setCategories(data));
        if(response.data.breakingNews.length !== 0){
            dispatch(setBreakingNews(response.data.breakingNews))
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const getRegions = async (dispatch) => {
    try {
        const response = await apiConnector('GET', GET_REGION)
        const data = response.data.regions;
        dispatch(setRegions(data));
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const createCategory = async (name, dispatch) => {
    const toastId = toast.loading('Creating Category...')
    try {
        const response = await apiConnector('POST', CREATE_CATEGORY, { name: name });

        if (response.data.success) {
            toast.dismiss(toastId)
            toast.success(response.data.message)
            dispatch(setCategories(response.data.data))
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const createRegion = async (name, dispatch) => {
    const toastId = toast.loading('Creating Region...')
    try {
        const response = await apiConnector('POST', CREATE_REGION, { name: name });

        if (response.data.success) {
            toast.dismiss(toastId)
            toast.success(response.data.message)
            dispatch(setRegions(response.data.data))
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const deleteCategory = async (id, dispatch) => {
    const toastId = toast.loading('Deleting Category...')
    try {
        const response = await apiConnector('DELETE', DELETE_CATEGORY, { id: id });
        if (response.data.success) {
            toast.dismiss(toastId)
            toast.success(response.data.message)
            dispatch(setCategories(response.data.data));
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const deleteRegion = async (id, dispatch) => {
    const toastId = toast.loading('Deleting Region...')
    try {
        const response = await apiConnector('DELETE', DELETE_REGION, { id: id });
        if (response.data.success) {
            toast.dismiss(toastId)
            toast.success(response.data.message)
            dispatch(setRegions(response.data.data));
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const updateCategory = async (id, name, dispatch, setter) => {
    const toastId = toast.loading('Updating Category...')
    try {
        const response = await apiConnector('PUT', UPDATE_CATEGORY, { id: id, name: name });
        if (response.data.success) {
            toast.dismiss(toastId)
            toast.success(response.data.message)
            dispatch(setCategories(response.data.data))
            setter(false);
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const updateRegion = async (id, name, dispatch, setter) => {
    const toastId = toast.loading('Updating Region...')
    try {
        const response = await apiConnector('PUT', UPDATE_REGION, { id: id, name: name });
        if (response.data.success) {
            toast.dismiss(toastId)
            toast.success(response.data.message)
            dispatch(setRegions(response.data.data))
            setter(false);
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}