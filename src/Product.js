import React, { useEffect, useState } from "react";

import backgroundImage from "./Assets/woman-shopping.jpg"

import ProductGrid from "./ProductGrid";

export default function Products(){

    const [ data , setData] = useState()

    useEffect(  () => {
        async function getData(){
            await fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                .then(json=>setData(json))
        } 
        getData()
    },[])


    const backgroundStyle = { 
        backgroundImage: `url(${backgroundImage})` ,
        backgroundSize: "cover",
        height : '35rem'
    }

   // console.log( "inside prd" , data)
   
    return (
        <>
            <div style= {backgroundStyle}>
                Hello World
            </div>

            <ProductGrid  data={data}/>
        </>
    )
}