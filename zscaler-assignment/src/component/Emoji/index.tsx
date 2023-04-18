import React from 'react';

// Style
// import './emojiImport.css';

const Emoji = (props: Props) => {
  const {label, symbol} = props;

  return (
  <span
    className='emoji'
    role='img'
    aria-label={label ?? ''}
    aria-hidden={!label}
  >
    {symbol}
  </span>
  )
};

type Props = {
    label?: string;
    symbol: string;  
}

export default Emoji;