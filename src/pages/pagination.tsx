import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const page = Number(router.query.page);
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProducts = async (page: number) => {
    // try {
    let res = await axios.get(`http://localhost:3000/products?page=${currentPage}&size=10`);
    const data = await res.data.data;
    console.log('>>>> ', data);
    getProducts(data);
    console.log('>>>', data.totalCount);
    // } catch {
    //   (error: Error) => console.log(`Error >> ${error}`);
    // }
  };

  const getProducts = (data: any) => {
    setProduct(data.products);
    setTotalCount(data.totalCount);
  };

  // const lastPage = page * 10; // 10개씩 보여줄거니까
  // const firstPage = lastPage - 10;

  // url 바꾸기
  const changePage = (page: number) => {
    router.push(`pagination?page=${page}`, undefined, { shallow: true, scroll: true });
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
      fetchProducts(page);
    }
  }, [page]);

  // 존재하지 않는 페이지에 들어갔을 때
  if (page < 1 || page > Math.ceil(products.length / 10)) {
    return <div style={{ textAlign: 'center', margin: 50 }}>존재하지 않는 페이지입니다.</div>;
  }

  return (
    <>
      <Container>
        <ProductList products={product} />
        <Pagination
          lastPage={Math.ceil(products.length / 10)}
          limit={5}
          currentPage={currentPage}
          onChange={changePage}
        />
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
