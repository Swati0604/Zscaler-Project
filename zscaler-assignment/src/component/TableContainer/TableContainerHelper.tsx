import { useMemo, useState } from "react";
import { ColumnType, SearchQueryType, SortConfig } from "../../utils/types";



export const useSortableData = (
  data: Record<string, any>[],
  config: SortConfig | null = null
) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(config);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { sortedData, requestSort, sortConfig };
};


export const getSearchQueryInitialValue = (columns: ColumnType[]) => {
    const searchQueryInitialValue = columns.reduce((acc: SearchQueryType, current: ColumnType) => {
        if(current.accessor){
          acc[current.accessor] = '';
        }
          return acc;
      }, {});

      return searchQueryInitialValue;
}


export const getFilteredData = (sortedData: any, columns: ColumnType[], searchQuery: SearchQueryType) => {
  const filteredData = sortedData.filter((item: any) => {
      let isMatch = true;
      for (let i = 0; i < columns.length -1 ; i++) {
          const column = columns[i];
          const searchValue = searchQuery[column.accessor];

          if (column.Header.length && searchValue && column.isVisible) {
              const itemValue = item[column.accessor].toString();
              if (!itemValue.includes(searchValue)) {
                  isMatch = false;
                  break;
              }
          }
      }
      return isMatch;
  });
  return filteredData;
}


export const getTotalNoOfPages = (currentDataLength: number, dataPerPage: number) => {
    let totalNumberOfPage = 0

    if(currentDataLength%dataPerPage!==0) {
      totalNumberOfPage =  Math.floor(currentDataLength/dataPerPage) + 1;
    } else {
      totalNumberOfPage =  Math.floor(currentDataLength/dataPerPage)
    }

    return totalNumberOfPage;
}