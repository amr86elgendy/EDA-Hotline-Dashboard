import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationSystem = ({ page, setPage, sorted }) => {

  return (
    <Pagination>
      <Pagination.First onClick={() => setPage(0)} disabled={page === 0} />
      <Pagination.Prev
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 0}
      />

      {sorted.length &&
        sorted.map((_, index) => (
          <Pagination.Item
            key={index}
            active={index === page}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

      <Pagination.Next
        onClick={() => setPage((prev) => prev + 1)}
        disabled={sorted.length === page + 1}
      />
      <Pagination.Last
        onClick={() => setPage(sorted.length - 1)}
        disabled={sorted.length === page + 1}
      />
    </Pagination>
  );
};

export default PaginationSystem;
