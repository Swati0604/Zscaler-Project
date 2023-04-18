//icons
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

//styles
import './selectPrimary.scss';

function SelectPrimary(props: Props) {
    const {title, listOpen, selectedValue, toggleList, list, itemSelected} = props;
  return (
    <div className='select-input'>
      <div
        className={listOpen ? 'list-header focus' : 'list-header'}
        onClick={toggleList}
      >
        {title && <span className={`${selectedValue ? 'selected-title' : 'title'}`}>
          {selectedValue ? selectedValue : title}
        </span>}
        {!listOpen ? (
          <FiChevronDown className='dropdown-icons' />
        ) : (
          <FiChevronUp className='dropdown-icons' />
        )}
      </div>

      {listOpen && (
        <ul className='list'>
          {list.map((item: ListType, index) => (
            <li
              className='list-item'
              key={item.title}
              onClick={() => itemSelected(item.value)}
            >
              {item.title}
              <br />
              <span className='item-info'>{item.listInfo}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


type Props = {
    title?: string;
    listOpen: boolean;
    selectedValue: string | number;
    toggleList: ()=> void;
    list: ListType[];
    itemSelected: Function
}


type ListType = {
    title: string;
    value: string | number;
    listInfo?: string;
}

export default SelectPrimary;