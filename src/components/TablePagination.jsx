import React from 'react';
import Pagination from "rc-pagination";
import {Button} from "./ui/button.jsx";
import {TbChevronLeft, TbChevronRight} from "react-icons/tb";
import {set} from "react-hook-form";
import {useNavigate} from "react-router-dom";

function TablePagination({ current, pageSize, total, setCurrentPage }) {
  const navigate = useNavigate();
  const onPageChange = (page) => {
    setCurrentPage(() => page);
    const params = new URLSearchParams();
    params.set('page', page);
    navigate(`${location.pathname}?${params.toString()}`)
  }

  const currentPage = current
  const itemRender = (current, type) => {
    switch (type) {
      case 'page':
        return (
          <Button
            className="w-8 h-8 rounded-md"
            variant={current === currentPage ? "default" : "secondary"}
          >
            {current}
          </Button>
        )
      case 'prev':
        return (
          <Button
            variant="secondary"
            className="w-8 h-8 rounded-md"
          >
            <TbChevronLeft className={"icon-sm"}/>
          </Button>
        )
      case 'next':
        return (
          <Button
            variant="secondary"
            className="w-8 h-8 rounded-md"
          >
            <TbChevronRight className={"icon-sm"}/>
          </Button>
        )
      case 'jump-next':
        return (
          <Button
            variant="ghost"
            className="w-8 h-8 rounded-md"
          >...</Button>
        )
      case 'jump-prev':
        return (
          <Button
            variant="ghost"
            className="w-8 h-8 rounded-md"
          >...</Button>
        )
    }
  }

  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onPageChange}
      showPrevNextJumpers={true}
      itemRender={itemRender}
      className='flex items-center gap-1 justify-end my-5'
      showLessItems={true}
    />
  );
}

export default TablePagination;