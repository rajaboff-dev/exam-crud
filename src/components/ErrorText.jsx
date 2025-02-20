import React from 'react';

function ErrorText({ children }) {
  return (
    <div className='text-red-400 text-sm'>{children}</div>
  );
}

export default ErrorText;