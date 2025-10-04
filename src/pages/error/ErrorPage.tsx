import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './ErrorPage.css';

const ErrorPage: React.FC = () => {
    return (
        <div className="error-page">
            <h1>404 - Stránka nenalezena</h1>
            <p>Oops! Tady kafe nepoteče :(</p>
            <Link to="/">Zpátky domů</Link> {/* Link to home page */}
        </div>
    );
};

export default ErrorPage;
