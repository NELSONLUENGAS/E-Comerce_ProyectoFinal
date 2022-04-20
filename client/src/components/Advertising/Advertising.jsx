import './Advertising.css'
export default function Advertising({img}){
    return(<>
    
            
        <div className="container-advertising">
            <div className="container-div-advertising">
            <h2 >Descubrí</h2>
                <div className="container-div-offer-advertising">
                    <div className="container-left-div-offer-advertising">
                        <p className="sub-title-advertising">Ofertas en zapatillas</p>
                        <p className="title-advertising">HASTA 30% OFF Y 6x SIN INTERES</p>
                        {/* <button className="button-view-details-offer-advertising" >Ver más</button> */}
                    </div>
                    <div className="container-right-div-offer-advertising">
                        <img className="img-div-offer-advertising"src={img[0]} alt="Imagen" />
                        
                    </div>
                </div>
                <div className="container-div-offer-advertising">
                    <div className="container-left-div-offer-advertising">
                    <p className="sub-title-advertising">Ofertas full</p>
                    <p className="title-advertising"style={{width:"200px"}}>TE LLEGA MAS RAPIDO</p>
                        {/* <button className="button-view-details-offer-advertising" >Ver más</button> */}
                    </div>
                    <div className="container-right-div-offer-advertising">
                        <img className="img-div-offer-advertising" src={img[1]} alt="Imagen" />
                        
                    </div>
                </div>
        </div>
    </div>
    
    </>
    )
}