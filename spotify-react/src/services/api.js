import axios from 'axios';

export const api = {
    get
}

async function get(endpoint, params={}){
    console.log("API GETTING " + endpoint + ' WITH PARAMS: ' + JSON.stringify(params));
    try {
        return await axios.get('https://spotthefye.herokuapp.com/'+endpoint, params).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
        return error;
    })} catch (error){
        console.error(error);
    }
}
