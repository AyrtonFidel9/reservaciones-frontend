import { setCookie, getAllCookies, removeCookie } from "react-cookie";

const COOKIE_NAME = "react-cookies-with-auth";

export const saveCookie = value => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 14);

    return setCookie(COOKIE_NAME, value, { expires });
};


export const deleteCookie = () => {
    removeCookie(COOKIE_NAME);
};



