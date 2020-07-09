export const getAdminRequestConfig = () => {
    const admin = localStorage.getItem("loggedAdmin");
    if (admin) {
        const token = JSON.parse(admin)['auth-token'];
        return {
            headers: {
                'auth-token': token
            }
        }
    }
    else {
        return {};
    }

};


