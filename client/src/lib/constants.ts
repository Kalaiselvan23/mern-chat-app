export const HOST=import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTE="auth"
export const SIGNUP_ROUTE=`${AUTH_ROUTE}/signup`
export const LOGIN_ROUTE=`${AUTH_ROUTE}/login`
export const GETUSER_INFO=`${AUTH_ROUTE}/user-info`
export const UPDATE_PROFILE=`${AUTH_ROUTE}/update-profile`
export const LOGOUT_ROUTE=`${AUTH_ROUTE}/logout`

export const CONTACTS_ROUTE=`contacts`
export const SEARCH_CONTACT_ROUTE=`${CONTACTS_ROUTE}/search`