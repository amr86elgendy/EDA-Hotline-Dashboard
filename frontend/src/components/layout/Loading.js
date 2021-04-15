import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      variant="primary"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
      className='mt-5'
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loading;