

export const getAuthorizedUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}