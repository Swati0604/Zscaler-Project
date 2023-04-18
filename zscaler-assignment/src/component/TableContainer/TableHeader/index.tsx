//Custom Component
import PrimaryInput from "../../PrimaryInput";

//Utils
import { ColumnType, SortConfig } from "../../../utils/types";

const TableHeader = (props: Props) => {
  const { columns, value, onSearchInput, handleSortClick, sortConfig } = props;

  return (
    <thead>
      <tr>
        {columns.map((column: ColumnType, index: number) => {
          if (column.isVisible) {
            return (<th>
              <div
                key={column.Header + index}
                onClick={() => handleSortClick(column.accessor)}
                style={{ cursor: 'pointer' }}
              >
                {column.Header}
                {sortConfig?.key === column.accessor && (sortConfig?.direction === 'ascending' ? ' ▲' : ' ▼')}
              </div>
            </th>)
          }
          return null;
        }
        )}

      </tr>

      <tr>
        {columns.map((column: ColumnType, index: number) => {
          const { Header, accessor, isVisible } = column;

          if (isVisible) {
            return (
              <th>
                <div key={Header + index}>
                  {Header.length
                    ? <PrimaryInput
                      type='text'

                      value={value[accessor]}
                      placeholder={`Search ${Header}`}
                      onChange={(event) => onSearchInput(event, index)}
                      isActive={true}
                    />
                    : null}
                </div>
              </th>
            )
          }
          return null;
        })}
      </tr>
    </thead>
  )
}


type Props = {
  columns: ColumnType[];
  value: any;
  onSearchInput: (event: any, index: number) => void;
  handleSortClick: (column: string) => void;
  sortConfig: SortConfig | null;
}
export default TableHeader;