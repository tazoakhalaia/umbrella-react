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

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Space wrap>
          <Link to="/admin-panel">
            <Button>Admin Page</Button>
          </Link>
        </Space>
      </div>
      <div className='all-category'  style={{ display: 'flex', height: '60px', borderRadius: '3px', boxShadow: '0px 0px 5px gray', overflowX: 'auto' }}> 
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
