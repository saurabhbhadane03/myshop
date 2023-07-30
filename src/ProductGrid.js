import React from "react";

import './App.css';


export default function ProductGrid({data}){


    return (
        <>
            <h1 style={{textAlign:"center" , margin: "2.0rem" , fontWeight: "bold", fontSize: "3rem"}}>Man & Woman Fashion</h1>
            <div className="Product-grid">
                { data ?
                    data.map( item => {
                        return (
                            <div className="grid-item">
                               <div className="grid-item-heading"> 
                                  <h4>{item.title}</h4>
                                  <h5 className="grid-item-price">Price ${item.price}</h5>
                                </div>
                                <img src= {item.image} alt="product-img"/>
                                <button className="grid-item-button">Add to Cart</button>
                            </div> 
                        )
                    })
                    : ""
                }
            </div>
        </>
    )
}