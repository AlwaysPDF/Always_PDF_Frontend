// CustomErrorComponent.js
import React from 'react';

const CustomErrorComponent = (): JSX.Element => (
  <div>
    <p>An error occurred while viewing the file.</p>
    <button className='px-6 py-2 bg-deepblue rounded-md' onClick={() => window.location.reload()}>Retry</button>
  </div>
);

export default CustomErrorComponent;
