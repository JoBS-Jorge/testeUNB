import axios from 'axios'

export const api = axios.create({
    baseurl: 'https://restcountries.com/v3.1/all'
})