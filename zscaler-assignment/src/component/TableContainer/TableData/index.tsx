//Utils
import { ColumnType } from "../../../utils/types";

const TableData = ({ currentData, columns, onMoreClick }: TableDataType) => {

  if (currentData.length > 0) {
    return (
      <tbody>
        {currentData.map((item: any, index: number) => {
          return (<TableRowItem
            item={item}
            column={columns}
            onMoreClick={onMoreClick}
            key={index}
          />
          )
        })}
      </tbody>)
  }


  return null;
}


const TableRowItem = ({ item, column, onMoreClick }: TableRowItemType) => {
  const handleDeleteRowClick = (_: any, item: any) => {
    onMoreClick(item)
  }
  return (
    <tr>
      {column.map((columnItem: ColumnType, index: number) => {
        const {accessor, isVisible} = columnItem;
        if(isVisible) {
          if (accessor === 'more') {
            return (
              <td
                key={accessor + index}
              >
                <div
                  className='cur-po delete-button'
                  onClick={(event) => handleDeleteRowClick(event, item)}
                >
                  -
                </div>
              </td>
            )
          }
          return (
            <td key={accessor + index}>
              {item[accessor] ? item[accessor] : '-'}
            </td>
          )
        }
        return null;
      })}


    </tr>
  )
}


type TableDataType = {
  currentData: any;
  columns: ColumnType[];
  onMoreClick: (rowData: any) => void
}

type TableRowItemType = {
  item: any
  column: ColumnType[]
  onMoreClick: (rowData: any) => void
}

export default TableData;
