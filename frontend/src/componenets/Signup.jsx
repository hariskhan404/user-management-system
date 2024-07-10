// frontend/src/components/Signup.js

import { useState } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            console.log('Signup successful. Token:', data.token);
            // Handle token storage or redirect to dashboard
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
                <label>Email:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
