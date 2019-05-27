/* Returns `true` if given string is a url */
module.exports = (url) => {
    const regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    return regex.test(url);
};
