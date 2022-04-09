export default function Advertising({img}){
    return(<>
    
            
        <div style={{display:"flex", flexDirection:"row",justifyContent:"center",marginTop:"7rem"}}>
            <div style={{display:"flex",flexDirection:"row",gap:"1rem",position:"relative"}}>
            <h2 style={{textAlign:"left",position:"absolute",top:"-4rem",fontFamily:"arial"}}>Descubrí</h2>
                <div style={{width:"48%",display:"flex",flexDirection:"row",backgroundColor:"#fff",height:"300px",borderRadius:"0.5rem"}}>
                    <div style={{width:"50%",alignItems:"center",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <h5>Ofertas en zapatillas</h5>
                        <h3>HASTA 30% OFF Y 6x SIN INTERES</h3>
                        <button style={{backgroundColor: "#3483fa",color:"white",border:"transparent",height: "50px",borderRadius: "0.2em",width:"8em"}} >Ver más</button>
                    </div>
                    <div style={{width:"50%",alignItems:"center",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <img style={{height:"250px"}}src={img[0]} alt="Imagen" />
                        
                    </div>
                </div>
                <div style={{width:"48%",display:"flex",flexDirection:"row",backgroundColor:"#fff",height:"300px",borderRadius:"0.5rem"}}>
                    <div style={{width:"50%",alignItems:"center",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <h5>Ofertas full</h5>
                        <h3 style={{width:"200px"}}>TE LLEGA MAS RAPIDO</h3>
                        <button style={{backgroundColor: "#3483fa",color:"white",border:"transparent",height: "50px",borderRadius: "0.2em",width:"8em"}} >Ver más</button>
                    </div>
                    <div style={{width:"50%",alignItems:"center",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <img style={{height:"250px"}}src={img[1]} alt="Imagen" />
                        
                    </div>
                </div>
        </div>
    </div>
    
    </>
    )
}