//Custom Component
// import NotFoundPage from '../../components/NotFoundPage';

//Images
import Page500Img from '../../assets/images/Page500.png';
import NotFoundPage from '../../component/NotFoundPage';

const Page500 = ()=> {
    return (
      <div className='Page'>
        <NotFoundPage
          notFoundImg={Page500Img}
          title='Oopsie! Something went wrong...'
          buttonText='Back to home'
          buttonLink='/'
          buttonColor='bg-green'
        />
      </div>
    );
}
export default Page500;