export const setToken = (token: string) => {
    localStorage.setItem('token', token);
    console.log("Token establecido:", token); // Verifica el token
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};
