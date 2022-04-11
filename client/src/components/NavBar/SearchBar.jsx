import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getSearch } from '../../actions'
import SearchIcon from '../../svg/search.svg'

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
        <form onSubmit={(e)=> handleSearch(e)} style={{display:"flex",backgroundColor:"#fff",width:"70%",justifyContent:"flex-end",alignItems:"center",flexDirection:"row",height:"50px",borderRadius:"0.5rem"}}>
            <input style={{height:"100%",width:"100%",marginTop:"0"}} value={busqueda} onChange={(e) => handleInputSearch(e)} type="search" placeholder="Buscar..." />
            <button type="submit" style={{height:"100%",backgroundColor:"#fff",border:"transparent",borderLeft:"1px solid grey"}} > <img style={{height:"15px",marginLeft:"1rem",marginRight:"1rem"}} src={SearchIcon}/></button>
        </form>
    )
}