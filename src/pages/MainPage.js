import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/MainPageCss.css';
import { Button, Space } from 'antd';

function MainPage() {
  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modal, setModal] = useState('')
  const [openModalBool, setOpenModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        const data = response.data;
        setAllProduct(data);
        const urlSearchParams = new URLSearchParams(window.location.search);
        const categoryParam = urlSearchParams.get('category');
        if (categoryParam) {
          const filtered = data.filter((item) => item.category === categoryParam);
          setFilteredProducts(filtered);
          setSelectedCategory(categoryParam);
        } else {
          setFilteredProducts(data);
          setSelectedCategory('');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        const data = response.data;
        setAllCategory(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchData();

    
  }, []);

  const handleCategoryFilter = (category) => {
    if (category === '') {
      setFilteredProducts(allProduct);
    } else {
      const filtered = allProduct.filter((item) => item.category === category);
      setFilteredProducts(filtered);
    }

    setSelectedCategory(category);
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('category', category);
    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };



  function openModal(id, name, price, img, category, desc){
   setModal(
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center',
    alignItems: 'center',zIndex: '1', position: 'fixed'}}>
    <div style={{ backgroundColor: 'white', width: '600px', height: '400px', display: 'flex', borderRadius: '5px', 
    boxShadow: 'rgba(90, 164, 67, 0.3) 2px 4px 2px 2px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', overflow: 'hidden' }}>
      <div style={{ width: '50%',}}>
        <img style={{ width: '100%', height: '100%' }} src={`http://127.0.0.1:8000/images/${img}`} alt='producimage' />
      </div>
      <div style={{ width: '50%', marginLeft: '10px' }}>
        <div style={{ marginTop: '20px' }}>
          <span>Name Of Products: </span>
          <h1 style={{ fontSize: '14px' }}>{name}</h1>
          </div>
          <div style={{ marginTop: '15px' }}>
          <span>Price: </span>
          <h1 style={{ fontSize: '14px' }}>{price}</h1>
          </div>
          <div style={{ marginTop: '15px', overflow: 'hidden', overflowY: 'auto', wordBreak: 'break-all', height: '60px' }}>
          <span>Category: </span>
          <h1 style={{ fontSize: '14px' }}>{category}</h1>
          </div>
          <div style={{ marginTop: '15px', overflow: 'hidden', overflowY: 'auto', wordBreak: 'break-all', height: '60px' }}>
          <span>Description: </span>
          <h1 style={{ fontSize: '14px' }}>{ desc }</h1>
          </div>
      </div>
    </div>
    </div>
   )
  }
  return (
    <div>
       {modal}
      <div style={{ marginBottom: '20px' }}>
        <Space wrap>
          <Link to="/admin-panel">
            <Button>Admin Page</Button>
          </Link>
        </Space>
      </div>
      <div className='all-category'  style={{ display: 'flex', alignItems: 'center', height: '60px', borderRadius: '3px', boxShadow: '0px 0px 5px gray', overflowX: 'auto' }}> 
      <h1 style={{ fontSize: '12px', marginLeft: '10px' }}>Categories:</h1>
        {allCategory.map((item, index) => {
          return (
            <button
              onClick={() => handleCategoryFilter(item.category)}
              key={index}
              style={{ marginLeft: '10px', background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {item.category}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
        {filteredProducts.map((item, index) => {
          return (
            <div key={index} className="main-page-all-products">
              <div className="image">
                <img src={`http://127.0.0.1:8000/images/${item.img}`} alt={item.name} />
              </div>
              <div className="product-full-info">
                <div className="product-info word-wrap">
                  <span>Name Of Products: </span>
                  <h1>{item.name}</h1>
                </div>
                <div className="product-info word-wrap">
                  <span>Price: </span>
                  <h1>{item.price}</h1>
                </div>
                <div className="product-info word-wrap">
                  <span>Description: </span>
                  <h1>{item.desc}</h1>
                </div>
                <div className="product-info word-wrap">
                  <span>Category : </span>
                  <h1>{item.category}</h1>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Space wrap>
                      <Button onClick={() => openModal(item.id, item.name, item.price, item.img, item.category, item.desc)}>Open Product Modal</Button>
                      </Space>
                      </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
