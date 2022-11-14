import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import products from '../../api/data/products.json';
import { useRouter } from 'next/router';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const index = Number(router.query.id);
  const [currentPage, setCurrentPage] = useState(0);
  let product = products[currentPage];

  useEffect(() => {
    if (index) {
      setCurrentPage(index - 1);
    }
  }, [index]);

  return (
    <>
      {currentPage < 0 || currentPage > products.length ? (
        <div style={{ textAlign: 'center', margin: 50 }}>존재하지 않는 페이지입니다.</div>
      ) : (
        <>
          <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
          <ProductInfoWrapper>
            <Name>{product.name}</Name>
            <Price>{product.price.toLocaleString('ko-KR')}원</Price>
          </ProductInfoWrapper>
        </>
      )}
    </>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
