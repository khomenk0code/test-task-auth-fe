export const filterEmptyFields = (data) => {
    const filteredData = {};
    Object.keys(data).forEach((key) => {
        if (data[key] !== '') {
            filteredData[key] = data[key];
        }
    });
    return filteredData;
};


export function validatePasswords(formData, setError, event) {
    event.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
        setError('Passwords do not match');
        return false;
    }

    setError(null);
    return true;
}