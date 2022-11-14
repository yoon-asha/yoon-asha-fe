import type { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import products from '../api/data/products.json';
import ProductList from '../components/ProductList';

const InfiniteScrollPage: NextPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const currentPage = useRef(1);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    let res = await fetch(`http://localhost:3000/products?page=${currentPage}`);
    try {
      let res = await axios.get(`http://localhost:3000/products?page=${currentPage}&size=10`);
      const data = await res.data.data;
      setProducts((prev) => [...prev, ...products]);
    } catch (error: any) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Container>
        <ProductList products={products} />
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
