import { setIsLogin, setToken, setUser } from "../../slices/userSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import { toast } from 'react-hot-toast';

const { GET_RESET_PASSWORD_LINK, GET_VERIFICATION_LINK, RESET_PASSWORD, VERIFIED_USER } = authEndpoints

export const getVerifyLink = async () => {
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', GET_VERIFICATION_LINK);

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const verifyAccount = async (token, setter, navigate) => {
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', VERIFIED_USER, { token: token });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setter(false);
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
        navigate('/');
    }
}

export const getResetPasswordLink = async (email) => {
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('POST', GET_RESET_PASSWORD_LINK, { email: email });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const resetPassword = async (token, password, setter, dispatch) => {
    const toastId = toast.loading('Changing...')
    try {
        const response = await apiConnector('POST', RESET_PASSWORD, { token: token, password: password });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setter(true);
            dispatch(setToken(null));
            dispatch(setUser(null));
            dispatch(setIsLogin(false));
            localStorage.removeItem("loggedIn");
        }
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}