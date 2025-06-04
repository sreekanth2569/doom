import React, { useState } from 'react';
import './Header.css';

// Function to generate the list
const getListOfItems = () => {
  return (
    <div>
      <ul>
        <li>Oranges</li>
        <li>Banana</li>
        <li>Fish</li>
        <li>Dog</li>
        <li>Coco</li>
      </ul>
    </div>
  );
};

const Header = () => {
  const [showList, setShowList] = useState(false); // toggle state

  const handleToggle = () => {
    setShowList(prev => !prev); // toggle true/false
  };

  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Order your favorite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the food
        </p>
        <button onClick={handleToggle}>
          {showList ? 'Hide Menu' : 'View Menu'}
        </button>

        {/* Show list if state is true */}
        {showList && getListOfItems()}
      </div>
    </div>
  );
};

export default Header;
