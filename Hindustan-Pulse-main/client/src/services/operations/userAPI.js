import { setToken, setUser } from "../../slices/userSlice";
import { apiConnector } from "../apiConnector"
import { userEndpoints } from "../apis"
import { toast } from "react-hot-toast"

const { GET_TOKEN, GET_USER, SIGN_IN, SIGN_UP, UPDATE_USER, GET_ALL_USERS, DELETE_USER, PROMOTE_USER, DEMOTE_USER, BANNED_USER, CREATE_REQUEST, DELETE_REQUEST } = userEndpoints;

export const getToken = async (dispatch) => {
    // const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('GET', GET_TOKEN);

        if (response.data.success) {
            dispatch(setToken(true));
            getUser(dispatch)
            // toast.dismiss(toastId);
            // toast.success(response.data.message);
        }

    } catch (err) {
        dispatch(setToken(null))
        localStorage.removeItem("loggedIn");
        // toast.dismiss(toastId)
        // toast.error(err.message)
    }
}

export const getUser = async (dispatch) => {
    // const toastId = toast.loading('Getting User...');
    try {
        const response = await apiConnector('GET', GET_USER);
        if (response.data.success) {
            // toast.dismiss(toastId);
            // toast.success(response.data.message)
            dispatch(setUser(response.data.user));
        }
        else {
            dispatch(setToken(null));
            localStorage.removeItem("loggedIn");
        }
    } catch (err) {
        dispatch(setToken(null));
        localStorage.removeItem("loggedIn");
        // toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const signinUser = async (data, navigate, dispatch) => {
    const toastId = toast.loading('Signing In...');
    try {
        const response = await apiConnector('POST', SIGN_IN, data, null, null, null)

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message)
            dispatch(setToken(true));
            getUser(dispatch)
            localStorage.setItem('loggedIn', true);
        }


        // navigate('/mysaccount')
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const signupUser = async (data, setter) => {
    const toastId = toast.loading('Signing Up...');
    try {
        const response = await apiConnector('POST', SIGN_UP, data);

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
        }

        setter('signin');
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const updateUser = async (data, setter) => {
    const toastId = toast.loading('Updating User...');
    try {
        const response = await apiConnector('POST', UPDATE_USER, data);

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setter(null)
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const createRequest = async () => {
    const toastId = toast.loading('Sending Request...');
    try {
        const response = await apiConnector('POST', CREATE_REQUEST);

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const getAllUsers = async (setter, type) => {
    const toastId = toast.loading('Fetching all users...');
    try {
        const response = await apiConnector('POST', GET_ALL_USERS, { type: type });
        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setter(response.data.users)
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const promoteUser = async (id, setter, def) => {
    const toastId = toast.loading('Promoting User...');
    try {
        const response = await apiConnector('POST', PROMOTE_USER, { id: id });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setter(!def)
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const demoteUser = async (id, setter, def) => {
    const toastId = toast.loading('Demoting User...');
    try {
        const response = await apiConnector('POST', DEMOTE_USER, { id: id });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setter(!def)
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const cancleRequest = async (id, setter, def) => {
    const toastId = toast.loading('Cancling request...');
    try {
        const response = await apiConnector('POST', DELETE_REQUEST, { id: id });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setter(!def)
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const deleteUser = async (id, setter, defaultVal) => {
    const toastId = toast.loading('Deleting User...');
    try {
        const response = await apiConnector('POST', DELETE_USER, { id: id });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setter(!defaultVal)
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}

export const banUser = async (id, setter, defaultVal) => {
    const toastId = toast.loading('Banning User...');
    try {
        const response = await apiConnector('POST', BANNED_USER, { id: id });

        if (response.data.success) {
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setter(!defaultVal)
        };
    } catch (err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
    }
}
