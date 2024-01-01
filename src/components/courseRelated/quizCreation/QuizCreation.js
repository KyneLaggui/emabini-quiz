import React, { useState } from 'react'
import "./QuizCreation.scss"
import { IoRemoveCircleSharp } from "react-icons/io5";
import { IoMdRemoveCircle } from 'react-icons/io';

const QuizCreation = () => {

    const [quizTagName, setQuizTagName] = useState('');
    const [confirmedQuizTags, setConfirmedQuizTags] = useState([]);

    const [answerInput, setAnswerInput] = useState(['']);
    const [choiceInput, setChoiceInput] = useState(['', '', '']);

    const [points, setPoints] = useState(0);


    const handleConfirm = () => {
        if (quizTagName.trim() !== '') {
          setConfirmedQuizTags([...confirmedQuizTags, quizTagName]);
          setQuizTagName(''); 
        }
      };
    
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleConfirm();
        }
      };
    
      const handleDelete = (index) => {
        const updatedQuizTags = confirmedQuizTags.filter((_, i) => i !== index);
        setConfirmedQuizTags(updatedQuizTags);
      };

    

    //For Answer

    const addInput = () => {
        const newInputs = [...answerInput, '']; 
        setAnswerInput(newInputs);
    };

    const removeInput = (index) => {
        if (answerInput.length === 1) {
            return;
          }
        const newInputs = [...answerInput]; 
        newInputs.splice(index, 1);
        setAnswerInput(newInputs);
    };
    
      
    const handleInputChange = (index, event) => {
        const newInputs = [...answerInput];
        newInputs[index] = event.target.value;
        setAnswerInput(newInputs);
    };

    // For Choices

    const addChoiceInput = () => {
        const newInputs = [...choiceInput, '']; 
        setChoiceInput(newInputs);
    };

    const removeChoiceInput = (index) => {
        if (choiceInput.length === 2) {
            return;
          }
        const newInputs = [...choiceInput]; 
        newInputs.splice(index, 1);
        setChoiceInput(newInputs);
    };
    
      
    const handleChoiceInputChange = (index, event) => {
        const newInputs = [...choiceInput];
        newInputs[index] = event.target.value;
        setChoiceInput(newInputs);
    };

    const handlePointsChange = (e) => {
        const value = Math.max(parseInt(e.target.value), 0);
        setPoints(value);
    };


  return (
    <div className='qc-container'>
        <div className='qc-inputs'>
            <div className='qc-question-top'>
                <h2>Question:</h2>
                <div className='qc-points'>
                    <h2>Points:</h2>
                    <input type='number' className='points'
                    value={points} onChange={handlePointsChange}/>
                </div>
            </div>
            
            <input type='text' placeholder='Enter Question' />
        </div>
        <div className='qc-inputs'>
            <h1>Correct Answer/s:</h1>
            <div className='qc-dynamic-inputs'>
                {answerInput.map((inputs, index) => (
                    <div className='qc-input-settings'>
                        <input
                        key={index}
                        type='text'
                        placeholder='Enter Answer'
                        value={inputs}
                        onChange={(e) => handleInputChange(index, e)}
                        />
                        <IoRemoveCircleSharp color='var(--blue)' size={20}  onClick={() => removeInput(index)} />
                    </div>
                    
                    ))}
            </div>
            <button onClick={addInput}>Add Answer</button>
        </div>
        <div className='qc-inputs'>
            <h1>Choice/s:</h1>
            <div className='qc-dynamic-inputs'>
                {choiceInput.map((inputs, index) => (
                    <div className='qc-input-settings'>
                        <input
                        key={index}
                        type='text'
                        placeholder='Enter Choice'
                        value={inputs}
                        onChange={(e) => handleChoiceInputChange(index, e)}
                        />
                        <IoRemoveCircleSharp color='var(--blue)' size={20}  onClick={() => removeChoiceInput(index)} />
                    </div>
                    
                    ))}
            </div>
            <button onClick={addChoiceInput}>Add Choice</button>
        </div>
        <div className='qc-inputs'>
            <h1>Tag/s:</h1>
            <div className="quiz-tag-wrapper">
                {confirmedQuizTags.map((tagName, index) => (
                    <div className="quiz-tag-box" key={index}>
                    <span>{tagName}</span>
                    <IoMdRemoveCircle onClick={() => handleDelete(index)} />
                    </div>
                ))}

                <input
                    type="text"
                    placeholder="Add Quiz Tags..."
                    value={quizTagName}
                    onChange={(e) => setQuizTagName(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
            
        </div>
    </div>
  )
}

export default QuizCreation
