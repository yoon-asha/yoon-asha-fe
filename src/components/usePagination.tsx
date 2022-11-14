import { useRef, useState } from 'react';

// pageList - range 함수 직접 만들어서 쓸 때
const range = (size: number, start: number) => {
  return Array(size)
    .fill(start)
    .map((x, y) => x + y);
};

/** usePagination custom Hook
 * viewPageList - pagination 버튼들 5개씩 보여주기
 * currentGroupList - 현재 페이지 그룹의 index(5면 0, 8이면 1)
 */

const viewPageList = (lastPage: number, limit: number) => {
  // 1~11까지 배열
  const totalPageGroup = range(lastPage, 1);
  // totalPageGroup을 5개씩 나눌 배열
  const pageGroup = [];
  // 5
  for (let i = 0; i < totalPageGroup.length; i += limit) {
    pageGroup.push(totalPageGroup.slice(i, i + limit));
  }
  return pageGroup;
};

// 현재 페이지 그룹의 index
const currentGroup = (currentPage: number, limit: number) => {
  return Math.ceil(currentPage / limit) - 1;
};

type usePaginationArgs = {
  lastPage: number;
  limit: number;
  currentPage: number;
  onChange: any;
};

const usePagination = ({ lastPage, limit, currentPage, onChange }: usePaginationArgs) => {
  const pageGroup = useRef<number[][]>(viewPageList(lastPage, limit));
  const currentGroupIndex = useRef<number>(currentGroup(currentPage, limit));
  const [pages, setPages] = useState<number[]>(pageGroup.current[currentGroupIndex.current]);

  const firstGroup = currentGroupIndex.current === 0;
  const lastGroup = currentGroupIndex.current === pageGroup.current.length - 1;

  // page button click
  const clickPageBtn = (e: any) => {
    const { textContent } = e.target;
    const selectPage = Number(textContent);
    onChange(selectPage); // page url 변경
  };

  // prev button click
  const clickPrevBtn = () => {
    if (!firstGroup) {
      currentGroupIndex.current -= 1;
      // show prev page group
      setPages(pageGroup.current[currentGroupIndex.current]);
      // change url - 현재 그룹의 마지막 페이지로
      onChange(pageGroup.current[currentGroupIndex.current][limit - 1]);
    }
  };

  // next button click
  const clickNextBtn = () => {
    if (!lastGroup) {
      currentGroupIndex.current += 1;
      // show next page group
      setPages(pageGroup.current[currentGroupIndex.current]);
      // change url - 현재 그룹의 첫 번째 페이지로
      onChange(pageGroup.current[currentGroupIndex.current][0]);
    }
  };

  return { pages, firstGroup, lastGroup, clickPageBtn, clickPrevBtn, clickNextBtn };
};

export default usePagination;
