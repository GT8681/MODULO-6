import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationAccont.css';


const RegistrationAccont = () => {

    const isLogged = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''

    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.name) {
            alert('perfavore compila tutti i campi');
            return;
        }
        try {

            console.log('formData', formData);
            const response = await fetch("http://localhost:4545/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('accont creato con successo');
                navigate('/Login');
            } else if (response.status === 409) {
                alert('email gia registrata');
            } else {
                alert(errorData.message || 'Errore durante la registrazione');
            }
        } catch (error) {
            console.error('Si è verificato un errore. Riprova più tardi.');
        }
    }

    return <div className='register-page'>
        <div className='register-box'>
            <h2>CREA ACCOUNT</h2>
            <form onSubmit={handleRegister} className='register-form'>
                <div className='user-box d-flex flex-column' >
                    <label>Nome</label>
                    <input type="text"
                        name="name"
                        onChange={handleInputChange}
                        required />

                </div>
                <div className='user-box d-flex flex-column'>
                    <label>Cognome</label>
                    <input type="text"
                        name="surname"
                        onChange={handleInputChange}
                        required />

                </div>
                <div className='user-box d-flex flex-column'>
                    <label>Email</label>
                    <input type="email"
                        name="email"
                        onChange={handleInputChange}
                        required />

                </div>
                <div className='user-box d-flex flex-column'>
                    <label>Password</label>
                    <input type="password"
                        name="password"
                        onChange={handleInputChange}
                        required />

                </div>
                <button type="submit" className='btn-register'>
                    Registrati
                </button>
            </form>
            <div className="mt-3 text-center">
                {
                    isLogged && (

                        <button className='back-btn' type='button' onClick={() => navigate('/login')}>
                            HOME
                        </button>
                    )
                }


            </div>
        </div>
    </div>
}

export default RegistrationAccont;

