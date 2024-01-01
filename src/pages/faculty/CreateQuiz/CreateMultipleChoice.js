import React, { useState } from 'react'
import "./CreateMultipleChoice.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'
import RecipientBox from '../../../components/courseRelated/recipientBox/RecipientBox'
import QuizCreation from '../../../components/courseRelated/quizCreation/QuizCreation'

const CreateMultipleChoice = () => {
    const [activeTab, setActiveTab] = useState('examination');

    const [quizComponents, setQuizComponents] = useState([<QuizCreation key={0} />]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const addQuizComponent = () => {
        const newKey = quizComponents.length;
        const newComponent = <QuizCreation key={newKey} />;
        setQuizComponents([...quizComponents, newComponent]);
      };

  return (
    <>
        <Sidebar/>
        <PageLayout>
            <FacultyOnly>
                <div className='cmc-container'>
                    <div className='cmc-wrapper'>
                        <div className='cmc-top'>
                            <div className='cmc-input'>
                                <h1>Quiz Title:</h1>
                                <input type='text' placeholder='Enter Quiz Title...' />
                            </div>
                        </div>
                        <div className='cmc-bottom'>
                            <div className='cmc-input'>
                                    <h1>Quiz Instructions:</h1>
                                    <textarea type='text' placeholder='Enter Instructions...' />
                            </div>
                            <div className='cmc-input'>
                                <h1>Quiz Points:</h1>
                                <input type='text' placeholder='Enter Points...' />
                            </div>
                        </div>
                        <div className='cmc-tabs'>
                            <button
                            className={activeTab === 'examination' ? 'active' : ''}
                            onClick={() => handleTabClick('examination')}
                            >
                            Examination
                            </button>
                            <button
                            className={activeTab === 'shared' ? 'active' : ''}
                            onClick={() => handleTabClick('shared')}
                            >
                            Shared With
                            </button>
                    </div>

                    </div>
                    <div className='cmc-creation'>
                        <button>Create</button>
                        <p>Save as draft</p>
                    </div>
                    
                </div>
               
              {activeTab === 'examination' && (
               <div className='cmc-bottom-container'>
                <div className='cmc-quiz-components'>
                    {quizComponents.map((component, index) => (
                        <div key={index}>{component}</div>
                        ))}

                    <button className='cmc-quiz-button' onClick={addQuizComponent}>Add Quiz</button>
                </div>
                     
                    
                </div>
              )}
              {activeTab === 'shared' && (
                <div className='cmc-bottom-container'>
                    <RecipientBox/>
                </div>
                
              )}
                
            </FacultyOnly>
        </PageLayout>
    </>
    
  )
}

export default CreateMultipleChoice