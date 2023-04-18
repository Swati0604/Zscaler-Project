import { Link } from 'react-router-dom';

//Styles
import './notFoundPage.scss';

const NotFoundPage = (props: Props) => {
    const { notFoundImg, title, subTitle, buttonLink, buttonColor, buttonText } = props;

    return (
        <div className='not-found-style width100 valign-wrapper vcenter'>
            <div className='img-container valign-wrapper vcenter'>
                <img src={notFoundImg} className='not-found' alt='not-found' />
            </div>
            <p className='title center-align'>{title}</p>
            <p className='sub-title center-align'>{subTitle}</p>
            <Link to={buttonLink} className={`link-button valign-wrapper vcenter text-decoration-none ${buttonColor}`}>
                {buttonText}
            </Link>
        </div>
    );
}


type Props = {
    notFoundImg: string;
    title: string;
    subTitle?: string;
    buttonLink: string;
    buttonText: string;
    buttonColor: string;
}

export default NotFoundPage;