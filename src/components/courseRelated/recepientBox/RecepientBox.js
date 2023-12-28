import React, { useState } from 'react';
import './RecepientBox.scss'; // Your Sass file

const RecipientBox = () => {
  const [recipientName, setRecipientName] = useState('');
  const [confirmedRecipients, setConfirmedRecipients] = useState([]);

  const handleConfirm = () => {
    if (recipientName.trim() !== '') {
      setConfirmedRecipients([...confirmedRecipients, recipientName]);
      setRecipientName(''); // Clear the input after confirming
    }
  };

  const handleDelete = (index) => {
    const updatedRecipients = confirmedRecipients.filter((_, i) => i !== index);
    setConfirmedRecipients(updatedRecipients);
  };

  return (
    <div className="recipient-wrapper">
      <input
        type="text"
        placeholder="Enter recipient name"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
      />
      <button onClick={handleConfirm}>Confirm</button>

      {confirmedRecipients.map((name, index) => (
        <div className="recipient-box" key={index}>
          <span>{name}</span>
          <button onClick={() => handleDelete(index)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default RecipientBox;
