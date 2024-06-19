const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

export const authEndpoints = {
    GET_VERIFICATION_LINK: `${BASE_URL}/auth/getVerificationLink`,
    VERIFIED_USER: `${BASE_URL}/auth/verification`,
    GET_RESET_PASSWORD_LINK: `${BASE_URL}/auth/getResetPasswordLink`,
    RESET_PASSWORD: `${BASE_URL}/auth/resetPassword`,
}

export const userEndpoints = {
    SIGN_IN: `${BASE_URL}/user/signin`,
    SIGN_UP: `${BASE_URL}/user/signup`,
    GET_TOKEN: `${BASE_URL}/user/getToken`,
    GET_USER: `${BASE_URL}/user/getUser`,
    UPDATE_USER: `${BASE_URL}/user/updateUser`,
    DELETE_USER: `${BASE_URL}/user/deleteUser`,
    GET_ALL_USERS: `${BASE_URL}/user/getAllUsers`,
    CREATE_REQUEST: `${BASE_URL}/user/createRequest`,
    DELETE_REQUEST: `${BASE_URL}/user/deleteRequest`,
    PROMOTE_USER: `${BASE_URL}/user/promoteUser`,
    DEMOTE_USER: `${BASE_URL}/user/demoteUser`,
    BANNED_USER: `${BASE_URL}/user/bannedUser`,
}

export const newsEndpoints = {
    GET_ALL_NEWS: `${BASE_URL}/news/getAllNews`,
    GET_NEWS: `${BASE_URL}/news/getNews`,
    GET_MY_NEWS: `${BASE_URL}/news/getMyNews`,
    CREATE_NEWS: `${BASE_URL}/news/createNews`,
    UPDATE_NEWS: `${BASE_URL}/news/updateNews`,
    DELETE_NEWS: `${BASE_URL}/news/deleteNews`,
}

export const categoryEndpoints = {
    CREATE_CATEGORY: `${BASE_URL}/category/createCategory`,
    GET_CATEGORY: `${BASE_URL}/category/getCategory`,
    UPDATE_CATEGORY: `${BASE_URL}/category/updateCategory`,
    DELETE_CATEGORY: `${BASE_URL}/category/deleteCategory`,
    CREATE_REGION: `${BASE_URL}/category/createRegion`,
    GET_REGION: `${BASE_URL}/category/getRegion`,
    UPDATE_REGION: `${BASE_URL}/category/updateRegion`,
    DELETE_REGION: `${BASE_URL}/category/deleteRegion`,
}