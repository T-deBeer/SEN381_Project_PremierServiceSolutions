import Pagination from "react-bootstrap/Pagination";
// Pagination allows a table to be fixed in height and go through pages of rows.
export default function CustomPagination({
  activePage,
  itemsCountPerPage,
  totalItems,
  onPageChange,
}: {
  activePage: number;
  itemsCountPerPage: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsCountPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="align-self-center">
      <Pagination.First
        onClick={() => onPageChange(1)}
        linkClassName="bg-dark text-white"
      />
      

      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => onPageChange(number)}
          linkClassName="bg-dark text-white"
        >
          {number}
        </Pagination.Item>
      ))}


      <Pagination.Last
        onClick={() => onPageChange(pageNumbers.length)}
        linkClassName="bg-dark text-white"
      />
    </Pagination>
  );
}
