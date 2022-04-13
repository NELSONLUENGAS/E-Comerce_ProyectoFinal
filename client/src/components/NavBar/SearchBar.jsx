import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getSearch } from '../../actions'
import SearchIcon from '../../svg/search.svg'
import './SearchBar.css'
export default function SearchBar(){
    const [busqueda,setBusqueda] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleInputSearch(e){
        e.preventDefault()
        setBusqueda(e.target.value)
    }
    function handleSearch(e){
        e.preventDefault()
        const fetchData = async () => {
            await navigate('/')
            await dispatch(getSearch(busqueda))
        }
        fetchData()
       
    }

    return(
        <form onSubmit={(e)=> handleSearch(e)} className="form-search-bar">
            <input  value={busqueda} onChange={(e) => handleInputSearch(e)} type="search" placeholder="Buscar..." />
            <button type="submit" > <img className="img-search-bar" src={SearchIcon}/></button>
        </form>
    )
}