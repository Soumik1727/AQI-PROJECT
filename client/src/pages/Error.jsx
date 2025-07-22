
import { Link } from 'react-router-dom';
import img from '../assets/not-found.svg';
import './css/Error.css'; 

const Error = () => {


 
    return (
      <div className="error-container">
        <img src={img} alt='not found' />
        <h3>Ohh! Page not found</h3>
        <p>We can't seem to find the page you're looking for!</p>
        <Link to='/'>Back home</Link>
      </div>
    );
  
};

export default Error;

