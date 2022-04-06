import { useEffect } from "react";

export default function Pintado ({review}){

    useEffect(()=> {
        for (let i = 1; i <= review.quantity; i++) {
            const star = document.getElementById(`${review.description}${i}`);
            star.style.color = "#3483fa";
        }
    },[review])
    
    return(<>
<div style={{textAlign:"left",marginLeft:"3rem",display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start",marginBottom:"2rem",marginTop:"1rem"}}>
<div className="rating-product-detail" style={{marginLeft:"0",fontSize:"24px"}}>

<label
                                        id={`${review.description}${1}`}
                                    >
                                        ★
                                    </label>
                                    <label
                                        id={`${review.description}${2}`}
                                    >
                                        ★
                                    </label>
                                    <label
                                        id={`${review.description}${3}`}
                                    >
                                        ★
                                    </label>
                                    <label
                                        id={`${review.description}${4}`}
                                    >
                                        ★
                                    </label>
                                    <label
                                        id={`${review.description}${5}`}
                                    >
                                        ★
                                    </label></div>
                                        <h4>{review.title}</h4>
                                        <h6>{review.description}</h6>
                                        </div>
    </>
    )
}