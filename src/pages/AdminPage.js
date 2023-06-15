import React, { useState } from 'react';
import '../css/AdminPageCss.css';
import { Button, Input, Space, Upload } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';

function AdminPage() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState('');

  async function productData() {
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('desc', productDescription);
    formData.append('img', productImage);
    formData.append('category', productCategory);
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/product', formData);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <div>
      <header>
        <h1>Create Products</h1>
      </header>
      <main>
        <form>
          <div className='product-create-containter'>
            <div className='product-name-input'>
              <label htmlFor='name'>Product Name :</label>
              <Input
                name='name'
                className='products-input'
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className='product-name-input'>
              <label htmlFor='price'>Product Price :</label>
              <Input
                name='price'
                className='products-input'
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className='product-name-input'>
              <label htmlFor='description'>Product Description :</label>
              <TextArea style={{resize: 'none', height: '30px'}}
                name='description'
                className='products-input'
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <div className='product-name-input'>
              <label htmlFor='file_input'>Product Image :</label>
              <div className='file-input'>
                <input
                  type='file'
                  name='file-input'
                  id='file-input'
                  className='file-input__input'
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
                <label className='file-input__label' htmlFor='file-input'>
                <CloudUploadOutlined />
                  <span>Upload file</span>
                </label>
              </div>
            </div>
            <div className='product-name-input'>
              <label htmlFor='category'>Product Category :</label>
              <Input
                name='category'
                className='products-input'
                onChange={(e) => setProductCategory(e.target.value)}
              />
            </div>
          </div>
          <div className='create-prodcut-btn'>
            <Space wrap>
              <Button onClick={productData} type='primary'>
                Create Product
              </Button>
            </Space>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AdminPage;
