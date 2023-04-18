import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import Loader from '../../component/Loader';

//Custom Component
import Sidebar from '../../component/Sidebar';
import { getAttackerData } from '../../store/action';

//Utils
import { ATTACKER_DETAIL_COLUMN, isEmpty, SIDEBAR_ITEMS } from '../../utils';
import { AttackerDataType } from '../../utils/types';
import Page500 from '../Page500';

//Style
import './attackerDetails.scss';
import { checkColumnLength } from './AttackerDetailsHelper';
import ShowTableData from './ShowTableData';


const AttackerDetails = () => {
    const dispatch = useDispatch();

    const attackerDetailsdata = useSelector(({ attackerDetails }: any) => attackerDetails?.attackerDetails);

    const { isLoading, data: attackerDetails, isError } = attackerDetailsdata ?? {}

    useEffect(() => {
        dispatch(getAttackerData() as unknown as AnyAction);
    }, [dispatch]);

    const [modal, setModal] = useState(false);
    const [columns, setColumns] = useState(ATTACKER_DETAIL_COLUMN);
    const [rowData, setRowData] = useState<AttackerDataType>();
    const [showEditColComponent, setShowEditColComponent] = useState(false);
    const [dataArr, setDataArr] = useState<AttackerDataType[]>(attackerDetails);
    const [columnLength, setColumnLength] = useState(checkColumnLength(ATTACKER_DETAIL_COLUMN))

    useEffect(() => {
        setDataArr(attackerDetails)
    }, [attackerDetails])

    useEffect(() => {
        const columnLength = checkColumnLength(columns)

        setColumnLength(columnLength);
    }, [columns])

    // Toggle for Modal
    const toggleModal = () => {
        setModal(!modal);
    };

    //Toggle for Edit Column Section
    const toggleEditColumnComponent = () => {
        setShowEditColComponent(!showEditColComponent);
    }

    //Show and Hide Column
    const showHideColumn = (index: number) => {
        const updatedColumns = columns.map((column, i) => {
            if (i === index) {
                return { ...column, isVisible: !column.isVisible };
            } else {
                return column;
            }
        });

        setColumns(updatedColumns);
    }


    //Delete An Entire Row
    const deleteRow = () => {
        let newArray = dataArr.filter((element: AttackerDataType) => element !== rowData);

        setDataArr(newArray);
        toggleModal()
    }


    return (
        <>
            <Sidebar
                currentPage={SIDEBAR_ITEMS[1].title}
                sidebarItems={SIDEBAR_ITEMS}
            >

                {((isLoading && isEmpty(attackerDetails) && !isError)) &&
                    <Loader />
                }

                {
                    attackerDetails.length > 0 && !isLoading && !isError &&
                    <ShowTableData
                        data={dataArr}
                        toggleModal={toggleModal}
                        modal={modal}
                        columnLength={columnLength}
                        deleteRow={deleteRow}
                        columns={columns}
                        setRowData={setRowData}
                        toggleEditColumnComponent={toggleEditColumnComponent}
                        showEditColComponent={showEditColComponent}
                        showHideColumn={showHideColumn}
                    />
                }

                {console.log(isError)}


                {((!isLoading && isError)) &&
                    <Page500 />
                }

            </Sidebar>
        </>
    );
}



export default AttackerDetails;