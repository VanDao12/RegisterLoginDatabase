import React, {useState} from 'react';
import axios from 'axios';

const registerUrl = 'https://pmiwm1rl41.execute-api.us-west-1.amazonaws.com/prod1/register'

const Register = () => {
    const [name,setName]=useState('');
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || email.trim() ==='' || name.trim() ==='' || password.trim() ===''){
            setMessage('All fields are required');
            return;
        }
        setMessage(null);
        const requestConfig = {
            headers: {
                'x-api-key': 'V4gTSMEMyw4d1hgdSN1FU1iQ7ADUHtrz1nfnO2Gc'
            }
        }
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }
        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessage('Registration Successful');
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message);
            }else {
                setMessage('sorry, the backend server is down. Please try again later');
            }
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
                email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <input type="submit" value="Register" />
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register;