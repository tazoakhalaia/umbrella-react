import React, { useEffect, useState } from 'react';
import '../css/AdminPageCss.css';
import { Button, Input, Space } from 'antd';
import { CloudUploadOutlined, DeleteFilled } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminPage() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState('');
  const [allProduct, setAllProduct] = useState([])
  const [allCategory, setAllCategory] = useState([])
  const [productCreateMessage, setProductCreateMessage] = useState('')
  const [messageSuccess, setMessageSuccess] = useState(true)
  const [categorySuccessMessage, setcategorySuccessMessage] = useState('')
  const [categorySuccess, setCategorySuccess] = useState(true)

  async function productData() {
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('desc', productDescription);
    formData.append('img', productImage);
    formData.append('category', productCategory);

    if(productName !== '' && productPrice !== '' && productDescription !== '' && productImage !== null && productCategory !== ''){
      setMessageSuccess(true)
      setProductCreateMessage('Product created succssefully please refresh page')
    }else {
      setMessageSuccess(false)
      setProductCreateMessage('Please fill all fields')
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/product', formData);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
  }

  function deleteProduct(id){
    console.log(id);
    axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
  }

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

    const fetchCategoris = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        const data = response.data;
        setAllCategory(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoris()
    fetchData()

  }, []); 

  async function createCategory(){
    if(productCategory){
      setCategorySuccess(true)
      setcategorySuccessMessage('Category created succssefully please refresh page')
    }else {
      setCategorySuccess(false)
      setcategorySuccessMessage('Please fill fields')
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/category', {
        category: productCategory
      });
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
            <div className='product-info-input'>
              <label htmlFor='name'>Product Name :</label>
              <Input
                name='name'
                className='products-input'
                placeholder='Product Name'
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className='product-info-input'>
              <label htmlFor='price'>Product Price :</label>
              <Input
                name='price'
                className='products-input'
                placeholder='Product Price'
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className='product-info-input'>
              <label htmlFor='description'>Product Description :</label>
              <TextArea style={{resize: 'none', height: '30px'}}
                name='description'
                className='products-input'
                placeholder='Product Description'
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <div className='product-info-input'>
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
            <div className='product-info-input'>
              <label htmlFor='category'>Product Category :</label>
              <select className='products-input'  name='category' onChange={(e) => setProductCategory(e.target.value)}>
              <option disabled selected>Select a category</option>
                {allCategory.map((item, index) => {
                  return <option key={index} value={item.category}>
                    {item.category}
                  </option>
                })}
              </select>
            </div>
          </div>
          <h1 style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '14px', color: messageSuccess ? 'green' : 'red' }}>{productCreateMessage}</h1>
          <div style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
          <div className='create-prodcut-btn'>
            <Space wrap>
              <Button onClick={productData} type='primary'>
                Create Product
              </Button>
            </Space>
          </div>
          <div className='go-home-page'>
          <Space wrap>
           <Link to='/'><Button>Home Page</Button></Link>
            </Space>
          </div>
          </div>
        </form>
        <form>
        <div className='product-info-input'>
              <label htmlFor='category'>Product Category :</label>
              <Input
                name='category'
                className='products-input'
                placeholder='Category'
                onChange={(e) => setProductCategory(e.target.value)}
              />
            </div>
            <h1 style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '14px', color: categorySuccess ? 'green' : 'red' }}>{categorySuccessMessage}</h1>
            <div style={{ marginTop: '10px' }}>
            <Space wrap>
              <Button onClick={createCategory} type='primary'>
                Create Category
              </Button>
            </Space>
          </div>
        </form>
      </main>
      <section>
        <div className='all-product-header'>
            <h1>ID</h1>
            <h1>Name</h1>
            <h1>Price</h1>
            <h1>Description</h1>
            <h1>Category</h1>
            <h1>Image</h1>
            <h1>Delete</h1>
        </div>
        <div className='all-product-pos'>
        { allProduct.map((item, index) => {
            return <div key={index} className='all-product'>
                <h1>{ item.id }</h1>
                <h1>{ item.name }</h1>
                <h1>{ item.price }</h1>
                <div className="description-container">
                    <h1>{item.desc}</h1>
                    </div>
                <h1>{ item.category }</h1>
                <img src={`http://127.0.0.1:8000/images/${item.img}`} alt={item.name} />
                <div  className='delete-product'>
                <button onClick={() => deleteProduct(item.id)}><DeleteFilled /></button>
                </div>
            </div>
        })}
        </div>
      </section>
    </div>
  );
}

export default AdminPage;
