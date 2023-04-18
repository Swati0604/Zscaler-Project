// Style
import './primaryInput.scss';

const PrimaryInput = (props: Props) => {
  return (
    <div className='input-container-style'>
      <input
        className={`input-item ${props.className} ${
          props.rightContent ? 'input-right-style' : ''
        }`}
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        autoFocus={props.autoFocus}
        onKeyDown={props.onKeyDown}
        value={props.value}
        disabled={!props.isActive}
        onChange={props.onChange}
      />

      
        <div className='right-icon-style' onClick={props.clickIconHandler}>
          {props.rightContent}
        </div>
      
    </div>
  );
};


type Props = {
    className?: string;
    rightContent?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    autoFocus?: boolean;
    value?: string | number;
    isActive?: boolean;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement> & React.FormEventHandler<HTMLInputElement>
    clickIconHandler?: (e: any)=> void;
}


export default PrimaryInput;