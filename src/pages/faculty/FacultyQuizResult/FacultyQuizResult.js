import React, { useState } from 'react'
import "./FacultyQuizResult.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import RecipientBox from '../../../components/courseRelated/recipientBox/RecipientBox'
import SearchBar from '../../../components/filters/SearchBar'
import Sort from '../../../components/filters/Sort/Sort'
import AnswerStatus from '../../../components/resultRelated/AnswerStatus/AnswerStatus'

const FacultyQuizResult = () => {
    const [activeTab, setActiveTab] = useState('examination');
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    
  return (
        <>
            <Sidebar/>
            <PageLayout>
                <FacultyOnly>
                    <div className='fqr-main-container'>
                        <Link to="/faculty-quizzes" className='back-courses'>
                            <FaArrowLeft name='back-arrow'/>                        
                            <p>Back to Quizzes</p>
                        </Link>
                        <div className='fqr-container'>
                            
                            <div className='fqr-wrapper'>
                                <div className='fqr-top'>
                                    <div className='fqr-title'>
                                        <h1 className='result-quiz-title'>CPU Scheduling Examination</h1>
                                        <p>December 19, 2023 | 10:00AM-12:00PM</p>
                                    </div>
                                    <div className='fqr-details'>
                                        <div className='fqr-pts'>
                                            <p>Points:</p>
                                            <p className='fqr-possible-pts'>100 points possible</p>
                                        </div>
                                        <div className='fqr-instructions'>
                                            <p>Instructions</p>
                                            <p className='fqr-ins'>None</p>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                               
                                <div className='fqr-tabs'>
                                    <button
                                    className={activeTab === 'examination' ? 'active' : ''}
                                    onClick={() => handleTabClick('examination')}
                                    >
                                    Examination
                                    </button>
                                    <button
                                    className={activeTab === 'answers' ? 'active' : ''}
                                    onClick={() => handleTabClick('answers')}
                                    >
                                    Answers <span className='fqr-num-ans'>40</span>
                                    </button>
                                    <button
                                    className={activeTab === 'shared' ? 'active' : ''}
                                    onClick={() => handleTabClick('shared')}
                                    >
                                    Shared With
                                    </button>
                                </div>

                            </div>
                            <div className='fqr-creation'>
                                <button>Return Scores</button>
                                
                            </div>
                            
                        </div>
                    
                    {activeTab === 'examination' && (
                
                        <div className='fqr-quiz-components'>
                            {/* {quizComponents.map((component, index) => (
                                <div key={index}>{component}</div>
                                ))}

                            <button className='fqr-quiz-button' onClick={addQuizComponent}>Add Question</button> */}
                        </div>
                            
                            
                    
                    )}
                    {activeTab === 'answers' && (
                
                        <div className='fqr-answers'>
                            <div className='fqr-filters'>
                                <SearchBar />
                                <Sort />
                            </div>
                            <AnswerStatus />
                            
                        </div>
                            
                            
                    
                    )}
                    {activeTab === 'shared' && (                    
                        <RecipientBox/>
                    )}
                    </div>
                </FacultyOnly>
            </PageLayout>
        </>
  )
}

export default FacultyQuizResult