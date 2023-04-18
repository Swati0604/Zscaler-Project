import EmptyState from "../../../component/EmptyState"
import CustomModal from "../../../component/Modal"
import TableContainer from "../../../component/TableContainer"
import { AttackerDataType, ColumnType } from "../../../utils/types";
import ShowExitColumnSection from "../ShowEditColumnSection";

const ShowTableData = (props: Props) => {
    const { toggleModal, modal, columns, data, deleteRow, columnLength, setRowData, toggleEditColumnComponent, showEditColComponent, showHideColumn } = props;

    return (
        <div className='attacker-details-page'>
            <h1 className='left-align attacker-details-heading heading'>Attacker Details</h1>

            <ShowExitColumnSection
                toggleEditColumnComponent={toggleEditColumnComponent}
                showEditColComponent={showEditColComponent}
                columns={columns}
                showHideColumn={showHideColumn}
            />

            {columnLength > 1 ?
                <TableContainer
                    columns={columns}
                    data={data}
                    onMoreClick={(rowData) => {
                        toggleModal()
                        if (rowData) {
                            setRowData(rowData)
                        }
                    }}
                /> : <EmptyState
                    title='Oopsie! No Data Found'
                    subTitle='Please select table column'
                />
            }

            <CustomModal
                toggle={toggleModal}
                modal={modal}
            >
                <div className='valign-wrapper vflex-colomn delete-modal-container'>
                    <div className='title modal-text'>Are you sure, you want to delete this row?</div>

                    <div className='valign-wrapper'>
                        <button className='modal-button delete-button' onClick={deleteRow}>Yes, I confirm</button>
                        <button className='modal-button delete-cancel-button' onClick={toggleModal}>No, let It be</button>
                    </div>
                </div>
            </CustomModal>
        </div>
    )
}

type Props = {
    data: AttackerDataType[];
    toggleModal: () => void;
    modal: boolean;
    deleteRow: () => void;
    columns: ColumnType[];
    columnLength: number;
    setRowData: Function;
    toggleEditColumnComponent: () => void,
    showEditColComponent: boolean,
    showHideColumn: (index: number) => void;
}

export default ShowTableData