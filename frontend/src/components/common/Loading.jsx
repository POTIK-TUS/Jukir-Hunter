import React from 'react';

const Loading = ({ message = 'Loading, Tunggu sebentar' }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-secondary">{message}</p>
        </div>
    )
}