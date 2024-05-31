import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";

import './index.scss';
import App from './pages/app/App.tsx';
import Layout from './layout/Layout.tsx';
import AddImage from './pages/add-image/AddImage.tsx';
import AddedImages from './pages/added-images/AddedImages.tsx';
import Items from './pages/items/Items.tsx';
import Item from './pages/item/Item.tsx';
import About from './pages/about/About.tsx';
import '@smastrom/react-rating/style.css';
import Login from './pages/login/Login.tsx';
import Register from './pages/register/Register.tsx';
import SearchItem from './pages/search-item/SearchItem.tsx';
import AboutPhotos from './pages/about-photos/AboutPhotos.tsx';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/add-image' element={<AddImage />} />
          <Route path='/added-images' element={<AddedImages />} />
          <Route path='/items' element={<Items />} />
          <Route path='/item/:productId' element={<Item />} />
          <Route path='search' element={<SearchItem />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/about-photos' element={<AboutPhotos />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
