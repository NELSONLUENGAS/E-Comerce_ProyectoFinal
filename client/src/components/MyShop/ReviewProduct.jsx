import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import {useDispatch,useSelector} from 'react-redux'
import './ReviewProduct.css'
import { useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { getProductId,postProductReview } from "../../actions";

export default function ReviewProduct({image,name}){
    
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [description,setDescription] =useState("")
    const [title,setTitle] =useState("")
    const [rate,setRate] =useState(1)
    const productDetail = useSelector((state) => state.productId);
    const user = useSelector((state) => state.User);
    function handleInput(e){
        e.preventDefault();
        setDescription(e.target.value)
    }

    function handleBlur(e,num){
        for (let i = 1; i <= num; i++) {
            const star = document.getElementById(i);
            star.style.color = "#3483fa";
        }
        for (let i = 5; i > num; i--) {
            const star = document.getElementById(i);
            star.style.color = "gray";
        }
        setRate(num);

    }
    function handleTitle(e){
        e.preventDefault()
        setTitle(e.target.value)
    }
    const { id } = useParams();
    useEffect(()=>{
        dispatch(getProductId(id));
        
    },[dispatch])

    function handleReview(e){
        e.preventDefault()
        const productReviewData={ rate:rate,content:description,title:title}
        console.log(productReviewData)
        dispatch(postProductReview(user.email,id,productReviewData))
        alert('Su review ha sido ingresada correctamente!')
        navigate('/user/myShop')
    }

    return(<>
        <NavBar/>
        <div className="container-do-review">
            <div className="top-do-review">
                <div style={{marginTop: "1.5rem"}}>
                    <h4>¿Qué te pareció este producto?</h4>
                    <h6>{productDetail.name}</h6>
                   
                <div className="stars-do-review">
                    <button
                        id="5"
                        onClick={(e) => {
                            handleBlur(e, 5);
                        }}
                    >
                        ★
                    </button>
                    <button
                        id="4"
                        onClick={(e) => {
                            handleBlur(e, 4);
                        }}
                    >
                        ★
                    </button>
                    <button
                        id="3"
                        onClick={(e) => {
                            handleBlur(e, 3);
                        }}
                    >
                        ★
                    </button>
                    <button
                        id="2"
                        onClick={(e) => {
                            handleBlur(e, 2);
                        }}
                    >
                        ★
                    </button>
                    <button
                        id="1"
                        onClick={(e) => {
                            handleBlur(e, 1);
                        }}
                    >
                        ★
                    </button>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-around",marginTop:"-2rem"}}><h6 style={{marginLeft:"30px"}}>Malo</h6><h6>Excelente</h6></div>
                </div>
                <div style={{marginTop: "2rem"}}>
                    <img src={productDetail.image} alt="" />
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",paddingLeft:"2rem",paddingTop:"1rem"}}>
                <h6>Resume tu opinion en una frase</h6>
                <input value={title} onChange={(e)=>handleTitle(e)}style={{height:"30px",width:"50%",resize:"none",borderRadius:"0.2rem"}}/>
            </div>
            <div className="bottom-do-review">
                <h6>Contale a otras personas sobre tu producto</h6>
                <div className="div-input-do-review">
                    <textarea style={{height:"100px",width:"80%",resize:"none",borderRadius:"0.5rem"}}value={description} onChange={(e)=> handleInput(e)}placeholder="Este producto me parecio..."/>
                </div>
                <button className="send-button-do-review" onClick={handleReview}>Enviar</button>
            </div>


        </div>
        </>
    )
}