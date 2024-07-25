import axios from 'axios'

export const apiCountry = axios.create({
    baseurl: 'https://restcountries.com/v3.1/all'
})

export const apiInstituition = axios.create({
    baseurl: 'http://universities.hipolabs.com/search?country='
})