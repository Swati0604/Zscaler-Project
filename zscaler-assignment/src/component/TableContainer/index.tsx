import { useState, useEffect, Fragment } from 'react';
import { Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Custom Component
import Pagination from './Pagination';
import EmptyStateUI from './TableEmptyStateUI';
import TableData from './TableData';
import TableHeader from './TableHeader';
import { getFilteredData, getSearchQueryInitialValue, getTotalNoOfPages, useSortableData } from './TableContainerHelper';

//Utils
import { ColumnType, SearchQueryType } from '../../utils/types';
import { isEmpty } from '../../utils';

//Styles
import './tableContainer.scss';


const TableContainer = (props: Props) => {

  const { columns, data, onMoreClick } = props;

  const pageNumberLimit = 5;

  const [dataPerPage, setDataPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { sortedData, requestSort, sortConfig } = useSortableData(data);
  const [currentData, setCurrentData] = useState(data);

  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [noOfPage, setNoOfPage] = useState(getTotalNoOfPages(data.length, dataPerPage))

  const searchQueryInitialValue = getSearchQueryInitialValue(columns);
  const [searchQuery, setSearchQuery] = useState(searchQueryInitialValue);


  useEffect(() => {
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;

    const filteredData = getFilteredData(sortedData, columns, searchQuery);

    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);
    const totalNumberOfPage= getTotalNoOfPages(filteredData.length, dataPerPage);

    setCurrentData(currentData);
    setNoOfPage(totalNumberOfPage);

  }, [currentPage, dataPerPage, sortedData, columns, searchQuery]);



  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  const noOfItemPerPage = (value: number) => {
    setDataPerPage(value)
  }



  const handleNextBtn = () => {
    if(noOfPage > currentPage) {
      setCurrentPage(currentPage + 1);

    }

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  const handlePrevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }


    if (currentPage > 1 && ((currentPage - 1) % pageNumberLimit === 0)) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);

    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber = parseInt(e.target.value);;

    if(isNaN(pageNumber) || pageNumber<0 || pageNumber===0){
      setCurrentPage(1);

    } else if(pageNumber>noOfPage){
      setCurrentPage(noOfPage);
    } else{
      setCurrentPage(pageNumber);
    }
  }


  const onSearchInput=(e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const dataAccessKey = columns[index].accessor;
    setSearchQuery((prevState: SearchQueryType) => ({
      ...prevState,
      [dataAccessKey]: value,
    }));

    setCurrentPage(1);
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  }


  return (
    <Fragment>
      <Table bordered className='width100 table-container'>
        <TableHeader
          columns={columns}
          value={searchQuery}
          onSearchInput={onSearchInput}
          sortConfig={sortConfig}
          handleSortClick={requestSort}
        />

        <TableData
          currentData={currentData}
          columns={columns} 
          onMoreClick={onMoreClick}
          />
      </Table>

      {(!Array.isArray(currentData) || isEmpty(currentData)) &&
        <EmptyStateUI />
      }

      {data.length !== 0 &&
        <Pagination
          dataPerPage={dataPerPage}
          totalNoOfPage={noOfPage}
          currentPage={currentPage}
          paginate={paginate}
          minPageNumberLimit={minPageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
          handleNextBtn={handleNextBtn}
          handlePrevBtn={handlePrevBtn}
          onChangeInput={onChangeInput}
          noOfItemPerPage={noOfItemPerPage}
        />
      }

    </Fragment>
  );
};




type Props = {
  columns: ColumnType[];
  data: any;
  onMoreClick: (rowData: any) => void;
}



export default TableContainer;