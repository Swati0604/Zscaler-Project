import { ColumnType } from "../../utils/types"

export const checkColumnLength = (columns: ColumnType[]) => {
    let counter = 1;

    for (let i = 0; i < columns.length -1 ; i++) {
        if(columns[i].isVisible){
            counter++;
        }
    }

    return counter;
}