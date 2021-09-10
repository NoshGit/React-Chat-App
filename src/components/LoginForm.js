import axios from 'axios';
import React, {useState} from 'react'

const projectID = 'fec9e64d-cbbd-4545-9f68-c631cdb58e59';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };
    
        try {
          await axios.get('https://api.chatengine.io/chats', { headers: authObject });
    
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
    
          window.location.reload();
          setError('');
        } catch (err) {
          setError('Oops, incorrect credentials.');
        }
    };
    
    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Noshir Chat Room</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={e=> setUsername(e.target.value)} className="input" placeholder="User Name" required />
                    <input type="password" value={password} onChange={e=> setPassword(e.target.value)} className="input" placeholder="Password" required />

                    <div  align="center">
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error" style={{color:'red'}} align="center">{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
