import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style.css';
import { API_URL } from '../../util';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('/classroom');
    const navigate = useNavigate();

    const handleClick = (link) => {
        setActiveLink(link);

        if (link === '/studentlogout') {
            handleLogout();
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`);
            navigate('/studentlogin');
        } catch (err) {
            console.error('Failed to log out:', err);
        }
    };

    return (
        <div>
            <header className="header">
                <h1>Classroom Management</h1>
            </header>
            <aside className="sidebar">
                <ul>
                    <li
                        className={activeLink === '/studentclassroom' ? 'active' : ''}
                        onClick={() => handleClick('/studentclassroom')}
                    >
                        <Link to="/classroom">Classroom</Link>
                    </li>
                    <li
                        className={activeLink === '/studentlogout' ? 'active' : ''}
                        onClick={() => handleClick('/studentlogout')}
                    >
                        <Link to="#">Log out</Link> 
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
