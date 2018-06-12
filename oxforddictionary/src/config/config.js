
import axios from 'axios';

export const serverApi1 = axios.create({
    baseURL: 'http://oxdict.orlyngerano.com/api'
});

/* add more api access
export const serverApi2 = axios.create({
    baseURL: 'https://xxxxx/api/v1'
});*/