//Images
import notFound from '../../assets/images/NotFound.svg';

//Styles
import './emptyState.scss';

function EmptyState(props: Props) {
    const {title, subTitle} = props;
  return (
    <div className='empty-state-style'>
      <div className='img-container'>
        <img src={notFound} className='not-found' alt='not-found' />
      </div>
      <p className='title'>{title}</p>
      <p className='sub-title'>{subTitle}</p>
    </div>
  );
}

type Props = {
    title: string;
    subTitle: string;
}

export default EmptyState;