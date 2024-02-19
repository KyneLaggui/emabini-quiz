import React, { useEffect, useState } from 'react'
import './StudentAnswerCard.scss'
import { FaCheck, FaVolumeUp } from 'react-icons/fa';
import { supabase } from '../../../supabase/config';
import { RxCross2 } from "react-icons/rx";


const StudentAnswerCard = ( {quizItem, number} ) => {
    // console.log(quizItem)
    // console.log(quizItem.isCorrect)

    const [quizQuestion, setQuizQuestion] = useState('');
    const [filteredChoices, setFilteredChoices] = useState([]);

    const evaluateChoice = (isGuessed, isCorrect) => {
        if (isGuessed && isCorrect) {
            return 'correctAns'
        } else if (isGuessed && !isCorrect) {
            return 'wrongAns'
        } else if (!isGuessed && isCorrect) {
            return 'rightAns'
        } else {
            return ""
        }
    }

    useEffect (()=> {
        const fetchData = async() => {
            if (quizItem) {

                const newChoices = quizItem.choices.map((choice) => {
                    
                    const temporaryStorage =  {
                        
                    }
                    temporaryStorage['choice'] = choice
                    let isFound = false
                    quizItem.guess.map((guess)=> {
                        if (guess === choice) {
                            temporaryStorage['isGuessed'] = true
                            isFound = true
                            if ((quizItem.answer).includes(guess)) {
                                temporaryStorage['isCorrect'] = true
                            } else {
                                console.log("wrong")
                                temporaryStorage['isCorrect'] = false
                            }
                        } 
                    })

                    if (!(isFound)) {
                        temporaryStorage['isGuessed'] = false
                        if ((quizItem.answer).includes(choice)) {
                            temporaryStorage['isCorrect'] = true
                        } else {
                            temporaryStorage['isCorrect'] = false
                        }
                    }



                    return  temporaryStorage

                })

                setFilteredChoices(newChoices)
            }
        }
        fetchData()
        
    }, [quizItem])

    useEffect (()=> {
        const fetchData = async() => {
            if (quizItem) {
                const {data, error} = await supabase.from('question').select().eq('id', quizItem.question_id).single()
                
                if (data) {
                    setQuizQuestion(data.question)
                }
            }
        }
        fetchData()
        
    }, [quizItem])


  return (
    <>  
        <div className='student-answer-parent-container'>
            <div className="student-quiz-card-container">
                    <div className={`student-question-number ${quizItem.isCorrect  ? 'correct' : 'wrong'}`}>
                        {number}
                    </div>
                    {/* <div className="student-question-point">{`${quizItem.points} ${quizItem.points > 1 ? `points` : `point`}`}</div> */}
                    {/* <div className="volume-container">
                        <FaVolumeUp size={20} />
                    </div> */}
                    <div className="student-quiz-question">{quizQuestion}</div>
                </div>
                <div className="student-questions-container">
                    {filteredChoices.map((choice, index) => {
                        const choiceClass = evaluateChoice(choice.isGuessed, choice.isCorrect);
                        return (
                            <div key={index} className={`answer-container ${choiceClass}`}>
                                {choiceClass === 'correctAns' && (
                                    <div className={`correct-answer-container ${choiceClass}`}>
                                        <FaCheck className="check-icon" size={16} />
                                        <button>{choice.choice}</button>
                                    </div>
                                )}
                                {choiceClass === 'wrongAns' && (
                                    <div className={`wrong-answer-container ${choiceClass}`}>
                                        <RxCross2  className="wrong-icon" size={16} />
                                        <button>{choice.choice}</button>
                                    </div>
                                )}
                                {choiceClass === 'rightAns' && (
                                    <div className={`right-answer-container ${choiceClass}`}>
                                        <FaCheck className="check-icon" size={16} />
                                        <button>{choice.choice}</button>
                                    </div>
                                )}
                                {choiceClass === '' && (
                                    <div className="default-answer-container">
                                        <button>{choice.choice}</button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
        </div>
            
        </>
  )
}

export default StudentAnswerCard