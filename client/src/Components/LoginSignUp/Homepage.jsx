import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/homepage', { withCredentials: true });
                setMessage(response.data.message);
            } catch (err) {
                // Handle any errors, like unauthorized access
                setError('Access denied. Please log in.');
                console.error("Access denied:", err);
            }
        };

        fetchHomePageData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>
            <h1>Home Page</h1>
            {error && <div className="error">{error}</div>}
            {message && <div className="success">{message}</div>}
        </div>
    );
};

export default HomePage;
