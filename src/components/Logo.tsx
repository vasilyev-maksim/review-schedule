import * as React from 'react';

export const Logo: React.SFC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 40 40"
        >
            <path fill="white" d="M5.9 12.9v-7h11.4v11.4h-2.6L8.4 11l-.3-.3z" />
            <path fill="white" d="M0 20l8.1-8.1 8.1 8.1-1.8 1.8H5V25z" />
            <path fill="white" d="M5.9 34.1h7L11 32.2l-.3-.3 6.6-6.6v-2.6H5.9z" />
            <path fill="white" d="M20 40l-8.1-8.1 8.1-8.1 1.8 1.8V35H25z" />
            <path fill="white" d="M34.1 34.1H22.7V22.7h2.6l6.3 6.3.3.3.3-.3 1.9-1.9z" />
            <path fill="white" d="M40 20l-8.1 8.1-8.1-8.1 1.8-1.8H35V15z" />
            <path fill="white" d="M34.1 5.9v11.4H22.7v-2.6L29 8.4l.3-.3-.3-.3-1.9-1.9z" />
            <path fill="white" d="M28.1 8.1L20 16.2l-1.8-1.8V5H15l5-5z" />
        </svg>
    );
};
