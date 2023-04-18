import { ColumnType } from "../../../utils/types";

import './showEditColumnSection.scss';

const ShowExitColumnSection = (props: Props) => {
    const { toggleEditColumnComponent, showEditColComponent, columns, showHideColumn } = props;
    return (
        <div className='edit-column-section valign-wrapper width100'>
            <div
                className='valign-wrapper edit-row-column font-poppins cur-po'
                onClick={toggleEditColumnComponent}
            >
                Edit Row Columns
            </div>
            <div className={showEditColComponent ? 'show-edit-column-component' : 'hide-edit-column-component'}>
                {
                    Array.isArray(columns) && columns.map((column: ColumnType, index: number) => {
                        if (column.Header.length) {
                            return (
                                <div className='valign-wrapper' key={column.Header + index}>
                                    <input
                                        type="checkbox"
                                        checked={column.isVisible}
                                        onClick={() => showHideColumn(index)}
                                        className='checkbox-input cur-po'
                                    />
                                    {column.Header}
                                </div>
                            )
                        }
                        return null;
                    })
                }
            </div>
        </div>
    )
}


type Props = {
    columns: ColumnType[],
    toggleEditColumnComponent: () => void;
    showEditColComponent: boolean;
    showHideColumn: (index: number) => void;
}


export default ShowExitColumnSection;