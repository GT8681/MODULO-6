import './navbar.css';
import { useNavigate } from 'react-router-dom';




const NavBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAuthenthicated = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('logout effettuato');
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-botton  shadow-sm">

            <div className=' container-wrapper'>
                <div className='d-flex align-items-center justify-align-center alingn-content-between'>
                    <a className="navbar-brand d-flex align-items-center justify-content-between" href="#">
                        <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/383385910/original/5d147971e4752a16a4f33826a53c84f1db6e90a8/do-restaurant-fastfood-bbq-food-truck-and-3dfood-logo-design.jpg"
                            alt="logo "
                            width={100}
                            height={100}
                            className='d-inline-block align-text-top me-2 p-2 ' />
                        <h1 className='title fs-1 fs-md-2 m-2 ,-md-5'>
                            StriveBlog
                        </h1>
                    </a>
                </div>
                <button
                    className='navbar-toggler'
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">

                        {token && (

                            <li className="nav-item m-3">
                                <button className='back-btn' onClick={() => navigate('/Dashboard')}>  HOME   </button>
                            </li>
                        )
                        }
                        <li className="nav-item m-3">
                            <button className='back-btn' onClick={() => navigate('/RegistrationAccont')}>  REGISTRATI </button>
                        </li>
                        <li className="nav-item m-3">
                            <button className='back-btn' onClick={() => navigate('/login')}>  CONTATTI  </button>
                        </li>
                        {isAuthenthicated ? (
                            <li className="nav-item m-3">
                                <button onClick={handleLogout} className='back-btn'>LOGOUT</button></li>
                        ) : (
                            <li className="nav-item m-3">
                                <button className='back-btn' onClick={() => navigate('/login')}>  LOGIN  </button>
                            </li>
                        )
                        }

                    </ul>
                </div>

            </div>

        </nav>


    );

}
export default NavBar;