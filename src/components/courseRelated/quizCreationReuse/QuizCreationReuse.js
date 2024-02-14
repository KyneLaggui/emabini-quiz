import React, { useEffect, useState } from 'react'
import "./QuizCreationReuse.scss"
import { IoBatteryCharging, IoLockOpen, IoRemoveCircleSharp } from "react-icons/io5";
import { IoMdRemoveCircle } from 'react-icons/io';
import Swal from 'sweetalert2';
import { ADD_QUESTION, REMOVE_QUESTION, selectCurrentQuestions } from '../../../redux/slice/quizReuseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const QuizCreationReuse = ({ manipulateQuestion, number, questionInfo }) => {
    // const [question, setQuestion] = useState('');
    const [quizTagName, setQuizTagName] = useState('');
    const [confirmedQuizTags, setConfirmedQuizTags] = useState([]);
    const [showCheckbox, setShowCheckbox] = useState(false);
    // const [answerInput, setAnswerInput] = useState(['']);

    const [selectedAnswers, setSelectedAnswers] = useState([]);
    // const [choiceInput, setChoiceInput] = useState(['', '', '']);

    // const [points, setPoints] = useState(0);

    const [questionData, setQuestionData] = useState({
        question: '',
        choiceInput: ['', '', ''],
        quizTags: [],
        answerInput: [''],
        points: 1,
        questionId: ''
    })

    const handleConfirm = () => {
        if (quizTagName.trim() !== '') {
            const newQuizTags = [...confirmedQuizTags, quizTagName];

          setConfirmedQuizTags(newQuizTags);

            const newQuestionData = {
                ...questionData,
                quizTags: newQuizTags
            }

            setQuestionData(newQuestionData)

            manipulateQuestion(
                newQuestionData,
                number
            )

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

            const newQuestionData = {
                ...questionData,
                quizTags: updatedQuizTags
            }

            setQuestionData(newQuestionData)

            manipulateQuestion(
                newQuestionData,
                number
            )

        setConfirmedQuizTags(updatedQuizTags);
      };

    

    //For Answer
    const addInput = () => {
        if (questionData['answerInput'].length === questionData['choiceInput'].length) {
            return;
        }

        const newInputs = [...questionData['answerInput'], '']; 
        setQuestionData({
            ...questionData,
            answerInput: newInputs
        });

    };

    const removeInput = (index, answerKey) => {
        if (questionData['answerInput'].length === 1) {
            return;
        }
        const newInputs = [...questionData['answerInput']]; 

        newInputs.splice(index, 1);
        setQuestionData({
            ...questionData,
            answerInput: newInputs
        });
        
        const newSelectedAnswers = selectedAnswers;
        delete newSelectedAnswers[`answer${answerKey}`]
        
        setSelectedAnswers(newSelectedAnswers)        
    };
    
    // For Choices
    const addChoiceInput = () => {
        const newInputs = [...questionData['choiceInput'], ''];    
    
        const newQuestionData = {
            ...questionData,
            choiceInput: newInputs
        }

        setQuestionData(newQuestionData) 
        
        manipulateQuestion(
            newQuestionData,
            number
        )
    };

    const removeChoiceInput = (index) => {
        if (questionData['choiceInput'].length === 2) {
            return;
          }
        const newInputs = [...questionData['choiceInput']]; 
        newInputs.splice(index, 1);
        setQuestionData({
            ...questionData,
            choiceInput: newInputs
        });
    };
    
      
    const handleChoiceInputChange = (index, event) => {
        const newInputs = [...questionData['choiceInput']];
        newInputs[index] = (event.target.value).toString();

        const newQuestionData = {
            ...questionData,
            choiceInput: newInputs
        }

        manipulateQuestion(
            newQuestionData,
            number
        )
        
        setQuestionData(newQuestionData);
    };

    const handlePointsChange = (e) => {
        const currentValue = e.target.value
        const value = Math.max(parseInt(currentValue), 0);        
        const newQuestionData = {
            ...questionData,
            points: value
        }
        setQuestionData(newQuestionData)

        manipulateQuestion(
            newQuestionData,
            number
        )
    };

    const handlePointBlur = (e) => {
        console.log('okay')
        const currentValue = (e.target.value).trim() === '' ? 1 : e.target.value
        const value = Math.max(parseInt(currentValue), 0);        
        const newQuestionData = {
            ...questionData,
            points: value
        }
        setQuestionData(newQuestionData)

        manipulateQuestion(
            newQuestionData,
            number
        )
    }

    // Form functions
    const handleQuestionChange = (event) => {
        const {value} = event.target;
        const newQuestionData = {
            ...questionData,
            question: value
        }

        manipulateQuestion(
            newQuestionData, 
            number
        )
        
        setQuestionData(newQuestionData);
    }  

    const handleAnswerChange = (event, index) => {
        const {value} = event.target;

        if (Object.values(selectedAnswers).includes(value)) {
            event.target.selectedIndex = 0;
            const newSelectedAnswers = selectedAnswers;
            delete newSelectedAnswers[`answer${index}`]
            setSelectedAnswers(newSelectedAnswers)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })
        
                Toast.fire({
                icon: 'error',
                title: 'No duplicate answers',
                
            })
        } else {
            

            let newAnswerInput = [...questionData['answerInput']]
            newAnswerInput[index] = value;
            const newQuestionData = {
                ...questionData,
                answerInput: newAnswerInput
            }

            setQuestionData(newQuestionData)

            const newSelectedAnswers = {
                ...selectedAnswers,
                [`answer${index}`]: value                
            }

            manipulateQuestion(newQuestionData, number)
            setSelectedAnswers(newSelectedAnswers)
        }
    }

    // useEffect(() => {
    //     console.log(selectedAnswers);
    // }, [manipulateQuestion, number, questionData, selectedAnswers])

    useEffect(() => {
        if (questionInfo) { 
            console.log(questionInfo)
            const newInfo = {
                question: questionInfo['question'],
                choiceInput: questionInfo['choiceInput'],
                quizTags: questionInfo['quizTags'],
                answerInput: questionInfo['answerInput'],
                points: questionInfo['points'],
                questionId: questionInfo['questionId'],              
            }

            console.log(newInfo)
            setConfirmedQuizTags(questionInfo['quizTags'])
            manipulateQuestion(newInfo, number)
            setQuestionData(newInfo)               
            return
        }

        manipulateQuestion(questionData, number)
    }, [questionInfo])

    // For question reuses
    const dispatch = useDispatch();

    const reduxCurrentQuestions = useSelector(selectCurrentQuestions);

    const addQuestion = () => {
        setShowCheckbox(!showCheckbox)
        if (showCheckbox) {
            dispatch(REMOVE_QUESTION(questionData))
        } else {
            console.log(questionData)
            dispatch(ADD_QUESTION(questionData))
        }
    }

    const {quizId} = useParams()

    const [isNew, setIsNew] = useState(true)
    useEffect(() => {
        if (quizId) {
            setIsNew(false)
        }
    }, [quizId])
 
    useEffect(() => {
        if (questionInfo) {
            reduxCurrentQuestions.map((question) => {
                if (question.questionId === questionInfo['id']){
                    console.log(question.questionId, questionInfo['id'])
                    setShowCheckbox(!showCheckbox)
            }
        })
        }
    }, [])

    useEffect(() => {
        if (questionInfo) {
            reduxCurrentQuestions.map((question) => {
                if (question.questionId === questionInfo['id']){
                    setShowCheckbox(true)
            }
        })
        }
    }, [reduxCurrentQuestions, questionInfo])

  return (
    <div className='qc-container'>
        {
           !isNew && (
            <div className='qc-checkbox'>
            <input
                type="checkbox"
                checked={showCheckbox}
                onChange={() => addQuestion()}
            />
            </div>
        )
        }
 
     
 
        <div className='qc-inputs'>
            <div className='qc-question-top'>
                <h2>Question:</h2>
                <div className='qc-points'>
                    <h2>Point(s):</h2>
                    <input type='number' className='points'
                    value={questionData['points']} onChange={handlePointsChange} onBlur={handlePointBlur}/>
                </div>
            </div>
            
            <input type='text' placeholder='Enter Question' onChange={handleQuestionChange} value={questionData.question} />
        </div>
        <div className='qc-inputs'>
            <h1>Correct Answer/s:</h1>
            <div className='qc-dynamic-inputs'>
                {questionData && questionData['answerInput'].map((inputs, index) => (
                    <div className='qc-input-settings' key={index}>
                        <select name={`answer${index}`} id=""
                        key={index}
                        type='text'
                        placeholder='Enter Answer'    
                        value={inputs}
                        onChange={(e) => handleAnswerChange(e, index)}         
                        >
                            <option value="" disabled selected>Select an answer</option>
                            {
                                questionData['choiceInput'].map((choice, index) => {                                   
                                    return <option value={choice} key={index}>{choice}</option>                                                                          
                                })
                            }
                        </select>
                        <IoRemoveCircleSharp color='var(--blue)' size={20}  onClick={(e) => removeInput(index, index)} />
                    </div>
                    
                    ))}
            </div>
            <button onClick={addInput}>Add Answer</button>
        </div>
        <div className='qc-inputs'>
            <h1>Choice/s:</h1>
            <div className='qc-dynamic-inputs'>
                {questionData['choiceInput'].map((inputs, index) => (
                    <div className='qc-input-settings' key={index}>
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

export default QuizCreationReuse