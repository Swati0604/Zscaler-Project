
import { useEffect, useState } from "react";

//Custom Component
import PrimaryInput from "../../PrimaryInput";
import SelectPrimary from "../../SelectPrimary";

// Style
import "./pagination.scss";


const SHOW_NO_OF_ITEM = [
    {
        title: 'Show 10 Items',
        value: 10
    },
    {
        title: 'Show 20 Items',
        value: 20
    },
    {
        title: 'Show 30 Items',
        value: 30
    }

];


function Pagination(props: Props) {
    const { dataPerPage,
        totalNoOfPage,
        paginate,
        maxPageNumberLimit,
        minPageNumberLimit,
        handlePrevBtn,
        handleNextBtn,
        currentPage,
        onChangeInput,
        noOfItemPerPage } = props;

    const [listOpen, setListOpen] = useState(false)

    const toggleList = () => {
        setListOpen(!listOpen);
    }

    const [pageNumbers, setPageNumber] = useState<number[]>([]);

    useEffect(()=> {
        let pageNumbers: number[] = []
        for (let i = 1; i <= Math.ceil(totalNoOfPage); i++) {
            pageNumbers.push(i);
        }
        

        setPageNumber(pageNumbers)
 }, [totalNoOfPage])

    let pageIncrementBtn = null;
    if (totalNoOfPage > maxPageNumberLimit) {
        pageIncrementBtn = <li className='page-numbers valign-wrapper vcenter dot-box' onClick={handleNextBtn}> ..... </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li className='page-numbers valign-wrapper vcenter dot-box' onClick={handlePrevBtn}> ..... </li>;
    }


    return (
        <nav className="pagination-style valign-wrapper width100">

            <div className="valign-wrapper">
                <PrimaryInput
                    name='Set Current Page'
                    type="text"
                    placeholder={'0'}
                    value={currentPage ?? 1}
                    onChange={onChangeInput}
                    isActive={true}
                    className={'input-style'}
                /> <span className="no-of-total-page"> /Out of {totalNoOfPage}</span>
            </div>

            <div className="select-style">
                <SelectPrimary
                    title={`Show ${dataPerPage} Items`}
                    listOpen={listOpen}
                    selectedValue={`Show ${dataPerPage} Items`}
                    toggleList={toggleList}
                    list={SHOW_NO_OF_ITEM}
                    itemSelected={noOfItemPerPage}
                />
            </div>


            <li className="page-numbers">
                <a onClick={() => handlePrevBtn()} href="#!" className={`page-link arrow-button ${currentPage===1 && 'disabled'}`}>
                    <span>{'<<'}</span>
                </a>
            </li>

            {pageDecrementBtn}

            

            <div className="valign-wrapper">
                
                {pageNumbers.map((number) => {
                    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                        return (
                            <li className="page-numbers" key={number}>

                                <a
                                    onClick={() => paginate(number)}
                                    href="#!"
                                    className={number === currentPage
                                        ? 'current-page-highlight page-link valign-wrapper vcenter'
                                        : 'valign-wrapper vcenter page-link'}
                                >
                                    {number}
                                </a>
                            </li>
                        );
                    } else {
                        return null;
                    }
                })}

            </div>

            


            {pageIncrementBtn}

            <li className="page-numbers">
                <a onClick={() => handleNextBtn()} href="#!" className={`page-link arrow-button ${currentPage===totalNoOfPage && 'disabled'}`}>
                    <span>{'>>'}</span>
                </a>
            </li>
        </nav>
    );
}


type Props = {
    dataPerPage: number;
    totalNoOfPage: number;
    currentPage: number;
    paginate: Function;
    maxPageNumberLimit: number;
    minPageNumberLimit: number;
    handlePrevBtn: () => void;
    handleNextBtn: () => void;
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    noOfItemPerPage: Function
}

export default Pagination;