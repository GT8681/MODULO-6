import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css'
import { Link } from 'react-router-dom';



const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoding, setIsLoding] = useState(false);
    const [error, setError] = useState(false);

    const Navigate = useNavigate();

    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoding(true);  
        setError(null);

        try {
            const response = await fetch("http://localhost:4545/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },

                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                    localStorage.setItem('token', data.token);  
                    localStorage.setItem('userId',data.user._id);
                Navigate('/dashboard');


            } else {
                setError(data.message || 'Email o password non validi');
            }
        } catch (error) {
            setError('Si è verificato un errore. Riprova più tardi.');
        } finally {
            setIsLoding(false);
        }
    };
    return (
        <div className='login-wrapper px-3 py-5 bg-light d-flex align-items-center justify-content-center vh-100' >
            <div className='container '>
                <div className='row justify-content-center'>
                    <div className='col-11 col-md6 col-lg-5 col-xl-4'>
                        <div className='card login-card shadow'>
                            <div className='card-body'>
                                <h2 className='text-center fw-bold mb-4'>LOGIN</h2>

                                <div style={{ minHeight: '50px' }}>
                                    {error && (
                                        <div key="alert-errore-login" className='alert alert-danger text-center custom-alert animate__animated animate__shakeX' role="alert">
                                            <i className="bi bi-exclamation-triangle-fill me-2">
                                            </i>
                                            {error}
                                        </div>
                                    )}
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className='mb-4'>
                                        <label className='form-label small fw-bold text-secondary '>EMAIL</label>
                                        <input
                                            name='email'
                                            type="email"
                                            className='form-control form-input-custom'
                                            placeholder='Inserisci la tua email'
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className='form-label small fw-semibold text-secondary'>PASSWORD</label>
                                        <input
                                            name='password'
                                            type="password"
                                            className='form-control form-input-custom'
                                            placeholder='inserisci password.....'
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className='d-grid mb-4'>



                                        <button
                                            type='submit'
                                            className='btn btn-login btn-primary w-100v text-white shadow-sm mx-auto'
                                            disabled={isLoding}
                                        >
                                            {isLoding ? (
                                                <>
                                                    <span className='spinner-border spinner-border-sm me-2' role="status" aria-hidden="true">
                                                    </span>
                                                    Caricamento.......
                                                </>
                                            ) : (
                                                'Login'
                                            )}
                                        </button>
                                    </div>

                                    <div className='text-center m-3'>
                                        <a href="#" className='small text-muted'>Recupera Password </a>

                                    </div>
                                </form>
                                <div className='text-center mt-4 d-flex justify-content-center align-items-center flex-column'>
                                    <span className='small text-muted me-4 text-success-emphasis' >VUOI REGISTRARTI?</span>
                                    <p> <Link to="/RegistrationAccont"> CREA  ACCOUNT</Link> </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
export default Login;