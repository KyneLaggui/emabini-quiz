import React, { useState } from 'react';
import './RecipientBox.scss'; 
import { IoMdRemoveCircle } from "react-icons/io";

const RecipientBox = () => {
  const [recipientName, setRecipientName] = useState('');
  const [confirmedRecipients, setConfirmedRecipients] = useState([]);

  const handleConfirm = () => {
    if (recipientName.trim() !== '') {
      setConfirmedRecipients([...confirmedRecipients, recipientName]);
      setRecipientName(''); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  const handleDelete = (index) => {
    const updatedRecipients = confirmedRecipients.filter((_, i) => i !== index);
    setConfirmedRecipients(updatedRecipients);
  };

  return (
    <div className="recipient-wrapper">
      

      {confirmedRecipients.map((name, index) => (
        <div className="recipient-box" key={index}>
          <span>{name}</span>
          <IoMdRemoveCircle onClick={() => handleDelete(index)} />
        </div>
      ))}

      <input
        type="text"
        placeholder="Add Students..."
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default RecipientBox;
