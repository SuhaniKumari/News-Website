exports.convertToArray = (data) => {
    if (!Array.isArray(data)) {
        data = [data]; // Convert to an array if it's a single image
    }
    return data;
}
exports.getPublicId = (data) => {
    var regex = /[!@#$%^&*(),.?":{}|<>]/g;
    // Replace special characters with an empty string
    let updatedData = data.replace(regex, '');
    return updatedData.replace(/ /g, '_');
}