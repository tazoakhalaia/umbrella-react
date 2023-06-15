import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/MainPageCss.css'

function MainPage () {
    const [allProduct, setAllProduct] = useState([])
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        const data = response.data;
        setAllProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }, []); 
    return (
        <div>
        <div className=''>
        { allProduct.map((item, index) => {
            return <div key={index} className='main-page-all-products'>
              <div className='image'>
                <img src={`http://127.0.0.1:8000/images/${item.img}`} alt={item.name} />
                </div>
                <div className='product-full-info'>
                <div className='product-info'>
                  <span>Name Of Product: </span>
                <h1>{ item.name }</h1>
                </div>
                <div className='product-info'>
                <span>Price: </span>
                <h1>{ item.price }</h1>
                </div>
                <div className="product-info">
                  <span>Description: </span>
                  <h1>{item.desc}</h1>
                  </div>
                    <div className='product-info'>
                <span>Category : </span>
                <h1>{ item.category }</h1>
                </div>
                </div>
            </div>
        })}
        </div>
        </div>
        )
    };

export default MainPage