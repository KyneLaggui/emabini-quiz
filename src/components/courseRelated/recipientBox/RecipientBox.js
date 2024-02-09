import React, { useEffect, useState } from 'react';
import './RecipientBox.scss';
import { IoMdRemoveCircle } from 'react-icons/io';
import FetchStudentsEmail from '../../../customHooks/fetchStudentsEmail';

const RecipientBox = ({ modifyStudentRecipients, course }) => {
  const [recipientName, setRecipientName] = useState('');
  const [confirmedRecipients, setConfirmedRecipients] = useState([]);
  const {emails} = FetchStudentsEmail(course)
  const [suggestionsBasis, setSuggestionsBasis] = useState([])
  const [suggestions, setSuggestions] = useState([]); // Sample suggestions

  const handleConfirm = (suggestion="") => {

    if (suggestion !== "") {
      setConfirmedRecipients([...confirmedRecipients, suggestion]);
      setRecipientName('');
      modifyStudentRecipients([...confirmedRecipients, suggestion]);
      return
    }

    if (recipientName.trim() !== '') {
      setConfirmedRecipients([...confirmedRecipients, recipientName]);
      setRecipientName('');
      modifyStudentRecipients([...confirmedRecipients, recipientName]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConfirm();
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setRecipientName(inputValue);

    // Filter suggestions based on the input value
    const filteredSuggestions = suggestionsBasis.filter(
      (suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    // Update the suggestions list
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setRecipientName(suggestion);
    handleConfirm(suggestion);
    // setSuggestions([]); // Clear suggestions after selecting one
  };

  const handleDelete = (index) => {
    const updatedRecipients = confirmedRecipients.filter((_, i) => i !== index);
    setConfirmedRecipients(updatedRecipients);
    modifyStudentRecipients(updatedRecipients);
  };

  useEffect(() => {

    if (emails) {
      setSuggestionsBasis(emails);
    }
  }, [emails])

  return (
    <div className="recipient-wrapper">
      {confirmedRecipients.map((name, index) => (
        <div className="recipient-box" key={index}>
          <span>{name}</span>
          <IoMdRemoveCircle onClick={() => handleDelete(index)} className="remove-circle" />
        </div>
      ))}

      <div className="input-recipient-container">
        <input
          type="text"
          placeholder="Add Students..."
          value={recipientName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        {recipientName && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      

      
    </div>
  );
};

export default RecipientBox;
