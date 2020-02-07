export const encodeSearchQuery = query => {
    let newQuery = query.replace(/ /g, '+');
    return newQuery;
};

export const encodeRecommendationQuery = options => {
    var encodedOptions = `api/recommendation?`;
    for (const key in options){
        var param = `${key}=${options[key]}`;
        encodedOptions = encodedOptions.concat(param);
        encodedOptions = encodedOptions.concat('&');
    }
    return encodedOptions.slice(0, encodedOptions.length - 1);
}; 

export const getDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {dd = '0' + dd;}
    if (mm < 10) {mm = '0' + mm;}
    return mm + '/' + dd + '/' + yyyy;
};

export default { encodeSearchQuery, encodeRecommendationQuery, getDate};