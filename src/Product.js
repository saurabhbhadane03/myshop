import React, { useEffect, useState } from "react";

import backgroundImage from "./Assets/woman-shopping.jpg"
import menuImage from "./Assets/menu-svgrepo-com.svg"
import searchIcon from "./Assets/search-alt-svgrepo-com.svg"
import CartIcon from "./Assets/shopping-cart-outline-svgrepo-com.svg"
import userIcon from "./Assets/user-svgrepo-com.svg"

import './App.css';


import ProductGrid from "./ProductGrid";

export default function Products(){

    const [ data , setData] = useState()
    const [ dropDown , setdropDown] = useState([])
    const [ searchText , setSearchText] = useState()
    const [ dropDownValue , setDropDownValue] = useState()

    const [ filterArray , setFilterArray] = useState()




    useEffect(  () => {
        async function getData(){
            await fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                .then(json=>{
                        setData(json)
                        const arr = json.map(item => {
                            return item.category
                        })
                        const Union = [...new Set(arr)]
                        setdropDown(Union)
                    })
        } 
        getData()

    },[])

    function searchWithText(){

        const filter = (data && searchText) ? data.filter( item => {
            return (item.title).toLowerCase().includes(searchText.toLowerCase())
        }): ""

        setFilterArray(filter)
    }

    function handleSearchText(e){
        const {value} = e.target

        setSearchText(value)
        if( value === "")
        {
            setFilterArray(data)
        }
        else{
            searchWithText()
        }
    }


    function handleDropDownChange(e){
        const {value} = e.target

        setDropDownValue(value)
    }

    useEffect( () => {

        console.log("drpValue" , dropDownValue)
        if( dropDownValue === 'All Category')
        {
            setFilterArray(data)
        }
        else
        {
            const filter = data ? data.filter( item => {
                return item.category === dropDownValue.toLowerCase()
            }) : ""
            setFilterArray(filter)
        }

    },[dropDownValue])

    console.log( "filter", filterArray)

    const backgroundStyle = { 
        backgroundImage: `url(${backgroundImage})` ,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        height : '35rem'
    }
    
    console.log("dropValue" , dropDownValue)
  

    return (
        <>
            <div style= {backgroundStyle} className="banner">

                
                    <div className="heading">
                        <h1>Eazy Shop</h1>
                    </div>
                    <div className="banner-menu">
                        <img src={menuImage} alt="menu-icon"/>
                        <select value={dropDownValue} onChange={(e) => handleDropDownChange(e)}>
                            <option>All Category</option>
                            {
                                dropDown.map( item => {
                                    return <option>{item.toUpperCase()}</option>
                                })
                            }
                        </select>
                        <div className="search-bar">
                            <input 
                                type="text"
                                value={searchText}
                                onChange={handleSearchText}
                                
                            />
                            <img src={searchIcon} alt="search-icon"/>
                        </div>
                        <img src={CartIcon} alt="" />
                        <img src={userIcon} alt="" />
                    </div>
               

                <div className="banner-slogan">
                    <h1>GET START</h1>
                    <h1>YOUR FAVORITE SHOPING</h1>
                </div>

                <div className="buyNow-button">
                    <button>Buy Now</button>
                </div>
            </div>
            {
                filterArray ?  <ProductGrid  data={filterArray}/> :  <ProductGrid  data={data}/>
            }

        </>
    )
}