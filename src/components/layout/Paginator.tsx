import { filter } from "lodash";
import styled from "styled-components";
import { Meta } from "../../types";

interface PaginatorProps {
  meta: Meta;
  perPage: number;
  curPage: number;
  setOffset: (x: ((x: number) => number) | number) => void;
}

const PageButton = styled.button<{ isActive?: boolean }>`
  font-weight: ${(props) => (props.isActive ? "700" : "400")};
  border-radius: 0;
  border: 0;
  padding: 15px 10px;
  margin: 0 8px 0 0;
  min-width: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const createBeforeAfter = (initial: number, buffer: number) =>
  Array.from({ length: buffer * 2 + 1 }, (v, k) => initial - buffer + k);

const Paginator = ({ meta, perPage, setOffset, curPage }: PaginatorProps) => {
  const maxPage = Math.ceil(meta.totalCount / perPage);
  return (
    <>
      <PageButton
        disabled={!meta.pageInfo.hasPreviousPage}
        onClick={() => setOffset((e: number) => e - perPage)}
      >
        Back
      </PageButton>
      {filter(createBeforeAfter(curPage, 2), (x) => x > 0 && x <= maxPage).map(
        (pageNumber) => {
          return (
            <PageButton
              key={pageNumber}
              isActive={curPage === pageNumber}
              onClick={() => {
                setOffset(perPage * (pageNumber - 1));
              }}
            >
              {pageNumber}
            </PageButton>
          );
        },
      )}
      <PageButton
        disabled={!meta.pageInfo.hasNextPage}
        onClick={() => setOffset((e: number) => e + perPage)}
      >
        Next
      </PageButton>
    </>
  );
};

export default Paginator;
