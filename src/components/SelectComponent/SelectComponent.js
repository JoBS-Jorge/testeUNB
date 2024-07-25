import './SelectComponent.css'
import React from 'react'
import { useEffect , useState } from 'react'
import { api } from '../../services/api'
import { TableComponent } from '../TableComponent/TableComponent'

const SelectComponent = () => {
    const [ countryList, setCountryList ] = useState([])
    const [ currentCountry, setCurrentCountry ] = useState('Brazil')

    const loadCountryList = async () => {
        api.get("https://restcountries.com/v3.1/all").then((response) => {setCountryList(response.data)})
    }

    useEffect(()=>{
        loadCountryList()
    } ,[])

    const handleCurrentCountry = (e) => {
        setCurrentCountry(e.target.value)
    }


  return (
    <div className='select-container'>
        <select className='select-control' value={currentCountry} onChange={handleCurrentCountry}>
            {countryList.map(country => {
                return <option value={country.name.common}>{country.name.common}</option>
            })}
        </select>
        
        <TableComponent country={currentCountry} />

    </div>
    
  )
}

export { SelectComponent }