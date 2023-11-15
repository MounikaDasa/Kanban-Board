import React, { useState } from 'react';

const CustomDropdown = ({ onGroupingChange, onOrderingChange }) => {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [groupingValue, setGroupingValue] = useState('user');
  const [orderingValue, setOrderingValue] = useState('priority');

  const handleGroupingChange = (event) => {
    setGroupingValue(event.target.value);
    onGroupingChange(event.target.value);
  };

  const handleOrderingChange = (event) => {
    setOrderingValue(event.target.value);
    onOrderingChange(event.target.value);
  };

  const handleDisplayClick = () => {
    setIsDisplayOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div>
        <label onClick={handleDisplayClick} style={{ cursor: 'pointer' }}>
          Display:
        </label>
        {isDisplayOpen && (
          <div>
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
