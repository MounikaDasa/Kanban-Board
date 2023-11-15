import React, { useState } from 'react';
import { Sliders, ChevronsDown } from 'react-feather';

const CustomDropdown = ({ onGroupingChange, onOrderingChange }) => {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [groupingValue, setGroupingValue] = useState('user');
  const [orderingValue, setOrderingValue] = useState('priority');

  const handleGroupingChange = (event) => {
    setGroupingValue(event.target.value);
    onGroupingChange(event.target.value);
    setIsDisplayOpen(false); // Close the dropdown after selecting
  };

  const handleOrderingChange = (event) => {
    setOrderingValue(event.target.value);
    onOrderingChange(event.target.value);
    setIsDisplayOpen(false); // Close the dropdown after selecting
  };

  const handleDisplayClick = () => {
    setIsDisplayOpen((prevState) => !prevState);
  };

  const handleDocumentClick = (event) => {
    // Close the dropdown if the click is outside the dropdown area
    if (isDisplayOpen && !event.target.closest('.custom-dropdown-container')) {
      setIsDisplayOpen(false);
    }
  };

  // Attach a click event listener to the document
  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isDisplayOpen]);

  return (
    <div className="custom-dropdown-container">
      <div style={{ position: 'relative' }}>
        <button
          onClick={handleDisplayClick}
          style={{
            cursor: 'pointer',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f8f8f8',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          <Sliders style={{ marginRight: '8px' }} />
          Display:
          <ChevronsDown style={{ marginLeft: '8px' }} />
        </button>
        {isDisplayOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              zIndex: '999',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginTop: '5px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              padding: '10px',
            }}
          >
            <div>
              <label>Grouping:</label>
              <select value={groupingValue} onChange={handleGroupingChange}>
                <option value="user">User</option>
                <option value="status">Status</option>
                <option value="priority">Priority</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label>Ordering:</label>
              <select value={orderingValue} onChange={handleOrderingChange}>
                <option value="priority">Priority</option>
                {/* Add more ordering options as needed */}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
