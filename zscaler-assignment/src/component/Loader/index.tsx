//Images
import loader from "../../assets/images/loader.gif";


function Loader() {
  return (
    <div className="loading-container">
        <img src={loader} className="loader" alt="loader" />
        <p className="loader-text">Loading ...</p>
      </div>
  );
}

export default Loader;