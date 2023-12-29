import React, { useState } from 'react';
import './RecipientBox.scss'; 
import { IoMdRemoveCircle } from "react-icons/io";

const RecipientBox = ({ modifyStudentRecipients }) => {
  const [recipientName, setRecipientName] = useState('');
  const [confirmedRecipients, setConfirmedRecipients] = useState([]);

  const handleConfirm = () => {
    if (recipientName.trim() !== '') {
      setConfirmedRecipients([...confirmedRecipients, recipientName]);
      setRecipientName(''); 
      modifyStudentRecipients([...confirmedRecipients, recipientName]);
    }
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     console.log('okay')
  //     handleConfirm();
  //   }
  // };

   // Prevents form submission upon pressing enter
   const handleKeyDown = (e) => {
      e.key === 'Enter' && e.preventDefault()
      if (e.key === 'Enter') handleConfirm()      
    }

  const handleDelete = (index) => {
    const updatedRecipients = confirmedRecipients.filter((_, i) => i !== index);
    setConfirmedRecipients(updatedRecipients);
    modifyStudentRecipients(updatedRecipients);
  };

  return (
    <div className="recipient-wrapper">
      

      {confirmedRecipients.map((name, index) => (
        <div className="recipient-box" key={index}>
          <span>{name}</span>
          <IoMdRemoveCircle onClick={() => handleDelete(index)} className="remove-circle"/>
        </div>
      ))}

      <input
        type="text"
        placeholder="Add Students..."
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        onKeyDown={handleKeyDown}
    
      />
    </div>
  );
};

export default RecipientBox;
