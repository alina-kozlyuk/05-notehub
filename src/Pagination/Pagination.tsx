import { useState } from 'react';
import css from './Pagination.module.css';
import ReactPaginateModule from "react-paginate";
import type { ComponentType } from "react";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = {
  default: T;
};

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationProps) {
    return (
            <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.page}
      previousClassName={css.page}
      nextClassName={css.page}
      disabledClassName={css.disabled}
    />
 )

    

}