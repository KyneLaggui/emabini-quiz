import React, { useState } from 'react'
import "./CreateMultipleChoice.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'
import RecipientBox from '../../../components/courseRelated/recipientBox/RecipientBox'
import QuizCreation from '../../../components/courseRelated/quizCreation/QuizCreation'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { supabase } from '../../../supabase/config'

const CreateMultipleChoice = () => {
    const [activeTab, setActiveTab] = useState('examination');

    const alterQuestion = (question, index) => {
        const newQuestions = questionData
        newQuestions[index] = {
            ...question,
            number: index
        }

        // setFormData({
        //     ...formData,
        //     questions: newQuestions
        // })        

        // Update question and tag trackers when altering a question
        updateQuestionTracker();
        updateTagTracker();
        console.log(questionData)
        setQuestionData(newQuestions)
    }

    const [quizComponents, setQuizComponents] = useState([<QuizCreation key={0} manipulateQuestion={alterQuestion} number={0} />]);

    const [formData, setFormData] = useState({
        title: "", 
        instructions: "",
        duration: "",
        questions: []
    }) 
    const [questionData, setQuestionData] = useState([]) 

    

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

        const newComponent = <QuizCreation key={newKey} manipulateQuestion={alterQuestion} number={newKey}/>;
        setQuizComponents([...quizComponents, newComponent]);

        // Update question and tag trackers when adding a new quiz component
        updateQuestionTracker();
        updateTagTracker();
      };

      const handleCreate = async () => {

        let totalScore = 0
        let questions = []

        for (let i = 0; i < questionData.length; i++) {
            totalScore += questionData[i]['points']

        }

        try {
            const { data } = await supabase
            .from('quiz')
            .insert([{
                title: formData['title'],
                instruction: formData['instructions'],
                overall_score: totalScore
            }])
            .select()
            .single()

            if (data) {
                const questions = []
                for (let i = 0; i < questionData.length; i++) {
                    const newQuestion = {
                        description: questionData[i]['question'],
                        quiz_id: data.id,
                        tag: questionData[i]['quizTags'],
                        answer: questionData[i]['answerInput'],
                        points: questionData[i]['points'],
                        choice: questionData[i]['choiceInput'],
                        number: questionData[i]['number']
                    }

                    questions.push(newQuestion)        
                }

                const { error } = await supabase.from('question')
                .insert(questions)
                .select()
                console.log(error)
            }
        } catch(error) {
            toast.error(error.message)
        }
        
      }

    // New state variables for question tracker and examination tag tracker
    const [questionTracker, setQuestionTracker] = useState([]);
    const [tagTracker, setTagTracker] = useState([]);

    // Function to update question tracker
    const updateQuestionTracker = () => {
        const questionNumbers = questionData.map((question) => question.number + 1);
        setQuestionTracker(questionNumbers);
    };

    // Function to update examination tag tracker
    const updateTagTracker = () => {
        const tags = questionData.map((question) => question.quizTags);
        // Assuming quizTags is an array of tags for each question
        const uniqueTags = Array.from(new Set(tags.flat())); // Flatten and get unique tags
        setTagTracker(uniqueTags);
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
                                 <div className='cmc-input duration'>
                                    <h1>Duration (minutes):</h1>
                                    <input type='number' placeholder='Enter Duration...' name="duration" onChange={(e) => onInputHandleChange(e)} />
                                </div>                                
                            </div>
                            <div className='cmc-bottom'>
                                <div className='cmc-input'>
                                        <h1>Quiz Instructions:</h1>
                                        <textarea type='text' placeholder='Enter Instructions...' name="instructions" onChange={(e) => onInputHandleChange(e)}  />
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
                            <button onClick={() => handleCreate()}>Create</button>
                            <p>Save as draft</p>
                        </div>
                        
                    </div>
                
                {/* {activeTab === 'examination' && ( */}

                 {/* Question tracker */}
                <div className='question-tracker-container'>
                    <h3>Question Tracker</h3>
                    <div className='question-tracker'>
                        {questionTracker.map((questionNumber) => (
                            <div key={questionNumber} className='question-calendar-day'>
                                {questionNumber}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Examination tag tracker */}
                <div className='tag-tracker-container'>
                    <h3>Tag Tracker</h3>
                    <div className='tag-tracker'>
                        {tagTracker.map((tag, index) => (
                            <div key={index} className='tag-input'>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            
                    <div className={`cmc-quiz-components ${activeTab === 'examination' ? '' : 'invisible'}`}>
                        {quizComponents.map((component, index) => (
                            <div key={index}>{component}</div>
                            ))}

                        <button className='cmc-quiz-button' onClick={addQuizComponent}>Add Question</button>
                    </div>
                        
                        
                   
                {/* )} */}
                <div className={`recipient-box-container ${activeTab === 'shared' ? '' : 'invisible'}`}>
                    <RecipientBox/>
                </div>
                {/* {activeTab === 'shared' && (                    


                )} */}

                
                </div>
            </FacultyOnly>
        </PageLayout>
    </>
    
  )
}

export default CreateMultipleChoice