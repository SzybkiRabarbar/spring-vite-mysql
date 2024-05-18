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
import { parseMutationArgs } from 'react-query/types/core/utils';

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
          <Route path='/about' element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
