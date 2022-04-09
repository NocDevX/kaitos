const getCookie = function (cookieName) {
    let cookie = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));

    if (cookie === null) {
        return false;
    } else {
        return cookie[2];
    }
};

export default {
    getCookie,
};
