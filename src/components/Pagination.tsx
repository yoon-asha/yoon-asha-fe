import React, { useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const Pagination = ({ totalPost, selectPage }: number | any): JSX.Element => {
  /**
   * totalPost - 총 게시물 개수
   * selectPage - 지금 선택한 페이지
   * limit - 한 번에 보여줄 페이지 버튼 수
   *
   * viewPageList - 버튼 리스트 5개씩 보여주기
   *
   *
   */

  // pageList - range 함수 직접 만들어서 쓸 때
  const range = (size: number, start: number) => {
    return Array(size)
      .fill(start)
      .map((x, y) => x + y);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  selectPage = Number(selectPage);

  // state
  const [show, setShow] = useState(true);

  // 5개씩 보여줄 리스트
  const viewPageList = (totalPost: number, limit: number) => {
    // [1~11까지 배열]
    const totalPageGroup = range(totalPost, 1);

    //totalPageGroup을 5개씨 나눌 배열
    const pageGroup = [];
    for (let i = 0; i < totalPageGroup.length; i += limit) {
      pageGroup.push(totalPageGroup.slice(i, i + limit));
    }

    return pageGroup;
  };

  // 현재 페이지 그룹의 index
  const currentGroupIdx = (currentPage: number, limit: number) => {
    return Math.ceil(currentPage / limit) - 1;
  };

  /** clickPrev
   * 5씩 숫자가 바뀔거니까(1-5, 6-10)
   * 이전페이지는 -5
   */
  const clickPrev = () => {};

  /** clickNext
   * 다음페이지는 +5
   */
  const clickNext = () => {};

  return (
    <Container>
      {/* 
      1이면 
      < 비활성화
       > 활성화

      5보다 크고 끝이 아니면 
      < 활성화 
      > 비활성화
      */}
      <Button disabled={show} onClick={clickPrev}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {[1, 2, 3, 4, 5].map((page) => (
          <Page key={page} selected={page === selectPage} disabled={page === selectPage}>
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={!show} onClick={clickNext}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;
  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
