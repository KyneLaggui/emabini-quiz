import React, { useEffect, useState } from 'react';
import { ADD_QUESTION, REMOVE_QUESTION, selectCurrentQuestions } from '../../../redux/slice/quizReuseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes, FaQuestion, FaCheck, FaFlask, FaMinusCircle } from 'react-icons/fa'; // Import icons
import './quizCart.scss';
import { supabase } from '../../../supabase/config';
import { useNavigate, useParams } from 'react-router-dom';

const QuizCart = ({ isPopupMinimized, togglePopup }) => {
    // For quiz question reusing
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const fetchedCurrentQuestions = useSelector(selectCurrentQuestions);

    const {quizId} = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectAll = async() => {
        const {data, error} = await supabase.from('question')
        .select()
        .eq('quiz_id', quizId)

        if (data) {
            data.map((question) => {
                const newQues = {
                    answerInput: question['answer'],
                    choiceInput: question['choice'],
                    points: question['points'],
                    question: question['question'],
                    questionId: question['id'],
                    quizTags: question['tag']
                }

                dispatch(ADD_QUESTION(
                    newQues
                ))
            })
        }
    }

    useEffect(() => {
        if (fetchedCurrentQuestions) {
            console.log(fetchedCurrentQuestions);
            setSelectedQuestions(fetchedCurrentQuestions);
        }
    }, [fetchedCurrentQuestions]);

    // Group questions by category
    const groupedQuestions = selectedQuestions.reduce((acc, question) => {
        acc[question.category] = acc[question.category] || [];
        acc[question.category].push(question);
        return acc;
    }, {});

    return (
        <div className={`selected-questions-popup ${selectedQuestions.length > 0 ? 'show' : ''} ${isPopupMinimized ? 'minimized' : ''}`}>
            <div className="popup-header" onClick={togglePopup}>
                <h3>Selected Questions</h3>
                <button className="question-cart-close">
                    <FaTimes className="fa-times"/>
                </button>
            </div>
            <div className="popup-body">
                {Object.entries(groupedQuestions).map(([category, questions]) => (
                    <div key={category}>
                        {questions.map((question, index) => (
                            <div key={index} className="indiv-question-cart-container">
                                {/* <FaMinusCircle className="minus-btn" onClick={() => dispatch(REMOVE_QUESTION(question))}/> */}
                                <p><span>Question: </span>{question['question']}</p>
                                <p><span>Points: </span>{question['points']}</p>
                                <p><span>ID: </span>{question['questionId']}</p>
                                <p><span>Answers: </span>{`${question['answerInput'].length} ${question['answerInput'].length > 1 ? 'answers' : 'answer'}`} </p>
                                <p><span>Choices: </span>{`${question['choiceInput'].length} ${question['choiceInput'].length > 1 ? 'choices' : 'choice'}`}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div onClick={() => selectAll()} className="select-all-button">Select All</div>
            <div onClick={() => navigate('/create-reused-questions-quiz')} className="use-button">Use Questions</div>
        </div>
    );
};

export default QuizCart;


