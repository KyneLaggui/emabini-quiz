import React, { useState } from 'react'
import "./CreateMultipleChoice.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'
import RecipientBox from '../../../components/courseRelated/recipientBox/RecipientBox'
import QuizCreation from '../../../components/courseRelated/quizCreation/QuizCreation'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CreateMultipleChoice = () => {
    const [activeTab, setActiveTab] = useState('examination');

    const alterQuestion = (question, index) => {
        const newQuestions = formData['questions']
        newQuestions[index] = question


        setFormData({
            ...formData,
            questions: newQuestions
        })
        console.log(formData)
    }

    const [quizComponents, setQuizComponents] = useState([<QuizCreation key={0} manipulateQuestion={alterQuestion} number={0} />]);

    const [formData, setFormData] = useState({
        title: "", 
        instructions: "",
        questions: []
    })  

     // Form functions
     const onInputHandleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })                    

        console.log(formData)
    }  

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    

    const addQuizComponent = () => {
        const newKey = quizComponents.length;   
        // const newQuestion = {   
        //     question: '',
        //     answers: [],
        //     choices: [],
        //     tags: []
        // }

        // setFormData({
        //     ...formData,
        //     questions: [...formData['questions'], newQuestion]
        // })

        const newComponent = <QuizCreation key={newKey} manipulateQuestion={alterQuestion} number={newKey}/>;
        setQuizComponents([...quizComponents, newComponent]);
      };

  return (
    <>
        <Sidebar/>
        <PageLayout>
            <FacultyOnly>
                <div className='cmc-main-container'>
                    <Link to="/faculty-quizzes" className='back-courses'>
                        <FaArrowLeft name='back-arrow'/>                        
                        <p>Back to Quizzes</p>
                    </Link>
                    <div className='cmc-container'>
                        
                        <div className='cmc-wrapper'>
                            <div className='cmc-top'>
                                <div className='cmc-input'>
                                    <h1>Quiz Title:</h1>
                                    <input type='text' placeholder='Enter Quiz Title...' name="title" onChange={(e) => onInputHandleChange(e)} />
                                </div>
                            </div>
                            <div className='cmc-bottom'>
                                <div className='cmc-input'>
                                        <h1>Quiz Instructions:</h1>
                                        <textarea type='text' placeholder='Enter Instructions...' name="instruction" onChange={(e) => onInputHandleChange(e)}  />
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
            
                    <div className='cmc-quiz-components'>
                        {quizComponents.map((component, index) => (
                            <div key={index}>{component}</div>
                            ))}

                        <button className='cmc-quiz-button' onClick={addQuizComponent}>Add Question</button>
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

export default CreateMultipleChoice