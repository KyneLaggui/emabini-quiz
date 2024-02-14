import React, { useEffect, useState } from 'react'
import "./QuizEdit.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'
import RecipientBox from '../../../components/courseRelated/recipientBox/RecipientBox'
import QuizCreation from '../../../components/courseRelated/quizCreation/QuizCreation'
import { FaArrowLeft, FaBook, FaTimes } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { supabase } from '../../../supabase/config'
import QuizNavigation from '../../../components/quizRelated/QuizNavigation/QuizNavigation'
import { selectUserID } from '../../../redux/slice/authSlice'
import { useSelector } from 'react-redux'
import FetchQuizInformation from '../../../customHooks/fetchQuizInformation'
import { selectCurrentQuestions } from '../../../redux/slice/quizReuseSlice'

const QuizEdit = () => {
    const [activeTab, setActiveTab] = useState('examination');
    // const [quizInformation, setQuizInformation] = useState({
    //     title: '',
    //     duration: 0
    // })

    const id = useSelector(selectUserID)

    const { quizId } = useParams();

    const { fetchedQuizInfo } = FetchQuizInformation(quizId);

    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const [isPopupMinimized, setIsPopupMinimized] = useState(false);

    const togglePopup = () => {
        setIsPopupMinimized(!isPopupMinimized);
    };

    const alterQuestion = (question, index) => {
        const newQuestions = questionData
        newQuestions[index] = {
            ...question,
            number: index
        }

        // Update question and tag trackers when altering a question
        updateQuestionTracker();
        updateTagTracker();
        setQuestionData(newQuestions)
        updateTotalPoints();
    }

    // Empty state because there are already predefined questions
    const [quizComponents, setQuizComponents] = useState([]);

    const [formData, setFormData] = useState({
        title: "", 
        instruction: "",
        duration: "",
        examinationTags: [],
        instructorId: id,
        students: [],
        courseCode: ""
    }) 

    const [questionData, setQuestionData] = useState([]) 

    // For Quiz navigation
    const alterFormData = (updatedQuizTags) => {
        const newFormData = {
            ...formData,
            examinationTags: updatedQuizTags
        }

        setFormData(newFormData)
    }

     // Form functions
     const onInputHandleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })                    

    }  

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    
    const [count, setCount] = useState([])

    const addQuizComponent = (questionInfo) => {
        const newKey = quizComponents.length;   
       
        const newComponent = <QuizCreation key={newKey} manipulateQuestion={alterQuestion} number={newKey} questionInfo={questionInfo}/>;
        setQuizComponents([...quizComponents, newComponent]);
        setCount([...count, newKey]);
        
        // Update question and tag trackers when adding a new quiz component
        updateQuestionTracker();
        updateTagTracker();
      };

      const revertQuizDetails = async () => {
        const { data } = await supabase
        .from('quiz')
        .update([{
            title: fetchedQuizInfo['title'],
            instruction: fetchedQuizInfo['instruction'],
            overall_score: fetchedQuizInfo['overall_score'],
            tags: fetchedQuizInfo['tags'],
            duration: fetchedQuizInfo['duration'],
            status: fetchedQuizInfo['status'],                                
            instructor_id: formData['instructorId'],
            course_code: formData['courseCode'],
        }])
        .eq('id', quizId)
        .select()
        .single()
    }

    // const deleteQuestions = async (questionIds) => {
    //     // Deletion of all the questions related to this quiz because it will be replaced by new
    //     // set of questions
    //     await supabase
    //     .from('question')
    //     .delete()
    //     .eq('quiz_id', quizId)
    //     .in('id', [questionIds])
    // }

      // Form submission handler
      const handleCreate = async (status) => {    
        let hasError = false;

  
        if (quizId) {
            console.log(questionData)
            try {                                                             
                const questions = []
                for (let i = 0; i < questionData.length; i++) {
                    // Checking if all questions have a designated answer
                    questionData[i]['answerInput'].forEach(async (answer) => {
                        if (answer === '')  {
                            toast.error("All questions must have an answer")
                            hasError = true;
                            return
                        }
                    })                                                            
                    
                    // Creation of the question rows
                    const newQuestion = {
                        question: questionData[i]['question'],
                        quiz_id: quizId,
                        tag: questionData[i]['quizTags'],
                        answer: questionData[i]['answerInput'],
                        points: questionData[i]['points'],
                        choice: questionData[i]['choiceInput'],
                        number: questionData[i]['number']
                    }

                    questions.push(newQuestion)        
                }    

                if (!hasError) {                    
                    const updateResult = await supabase
                    .from('quiz')
                    .update([{
                        title: formData['title'],
                        instruction: formData['instruction'],
                        overall_score: totalScore,
                        tags: formData['examinationTags'],
                        duration: formData['duration'],
                        status,                                
                        instructor_id: formData['instructorId']
                    }])
                    .eq('id', quizId)
                    .select()
                    .single()

                    if (!updateResult.error) {
                        toast.success("Quiz edited successfully!");
                    }
                    // Deletion of all the questions related to this quiz because it will be replaced by new
                    // set of questions
                    await supabase
                    .from('question')
                    .delete()
                    .eq('quiz_id', quizId)

                    const { error } = await supabase.from('question')
                    .insert(questions)
                    .select()
                    
                    if (!error && formData['students'] && !hasError && updateResult.data) {
                        const quizId = updateResult.data.id                                                
                        const courseEnrollees = await supabase.from('course_enrollee')
                        .select('email')
                        .eq('course_code', formData['courseCode'])       
                          

                        const courseStudents = courseEnrollees.data.map((student) => {
                            return student['email']
                        })

                        let quizTakers = []
                        console.log(formData['students']);
                        for (let i = 0; i < formData['students'].length; i++) {
                            if (!(courseStudents.includes(formData['students'][i]))) {                  
                                toast.error('The student is not enrolled in the proper course! Sharing to student(s) failed!')
                                return
                            }

                            const newTaker = {
                                student_email: formData['students'][i],
                                quiz_id: quizId
                            }
    
                            quizTakers.push(newTaker)
                        }
                        
                        
                        const { error } = await supabase.from('quiz_assignment')
                        .insert(quizTakers)
                        .select()
                        
                        if (!hasError && !error) {
                            quizTakers = []
                        } else {
                            if (error && error.code === '23503') {
                                toast.error("Email does not exist in the database! Sharing to students failed!")                            
                                return
                            } else {
                                if (error) {
                                    toast.error(error.message)
                                }
                            }
                        }
                    }
                } else {
                    revertQuizDetails();
                }                              
            } catch(error) {
                toast.error(error.message)
            }
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


    // Update total quiz points
    const [totalScore, setTotalScore] = useState(1);

    const updateTotalPoints = () => {
        let score = 0;
        
        for (let i = 0; i < questionData.length; i++) {
            score += questionData[i]['points']            
        }

        setTotalScore(score)
    }

    // Update quiz takers
    const modifyStudentRecipients = (newArr) => {
        setFormData({
            ...formData,
            students: newArr
        })
    }

    const [currentReusableQuestions, setCurrentReusableQuestions] = useState([])

    // For quiz question reusing
    const fetchedCurrentQuestions = useSelector(selectCurrentQuestions);

    useEffect(() => {
        console.log(fetchedCurrentQuestions);
    }, [fetchedCurrentQuestions])
    
    useEffect(() => {
        setFormData({
            ...formData,
            instructorId: id
        })    
    }, [id])

    // useEffect(() => {
    //     console.log(quizComponents)
    // }, [quizComponents])

    useEffect(() => {
        console.log(count)
    }, [count])

    useEffect(() => {
        // setQuizInformation(fetchedQuizInfo)     
        
        if (Object.keys(fetchedQuizInfo).length !== 0) {            
            console.log(fetchedQuizInfo)
            setFormData({
                title: fetchedQuizInfo['title'],
                duration: fetchedQuizInfo['duration'],
                instruction: fetchedQuizInfo['instruction'],
                examinationTags: fetchedQuizInfo['tags'],                
                courseCode: fetchedQuizInfo['course_code']
            })

            const newComponents = fetchedQuizInfo['questions'].map((question, index) => (
                <QuizCreation key={index} manipulateQuestion={alterQuestion} number={index} questionInfo={question}/>
            ));
    
            setQuizComponents(newComponents);
            setTagTracker(fetchedQuizInfo['tags']);
        }
    }, [fetchedQuizInfo])

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
                                    <input type='text' placeholder='Enter Quiz Title...' name="title" onChange={(e) => onInputHandleChange(e)} value={formData['title']} />
                                </div>
                                 <div className='cmc-input duration'>
                                    <h1>Duration (minutes):</h1>
                                    <input type='number' placeholder='Enter Duration...' name="duration" onChange={(e) => onInputHandleChange(e)} value={formData['duration']}  />
                                </div>                                
                            </div>
                            <div className='cmc-bottom'>
                                <div className='cmc-input'>
                                        <h1>Quiz Instructions:</h1>
                                        <textarea type='text' placeholder='Enter Instructions...' name="instruction" onChange={(e) => onInputHandleChange(e)} value={formData['instruction']}>
                                            {formData['instruction']}
                                        </textarea>
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
                            <button onClick={() => handleCreate('published')}>Edit</button>
                            <button onClick={() => handleCreate('draft')}>Save as draft</button>
                        </div>
                        
                    </div>
                
                {/* {activeTab === 'examination' && ( */}
                
                                                                                                               
                {/* )} */}
                <div className={`recipient-box-container ${activeTab === 'shared' ? '' : 'invisible'}`}>
                    <RecipientBox modifyStudentRecipients={modifyStudentRecipients}/>
                </div>
                <div className="questions-trackers-container">
                    <div className={`cmc-quiz-components ${activeTab === 'examination' ? '' : 'invisible'}`}>
                        {quizComponents.map((component, index) => (
                            <div key={index}>{component}</div>
                            ))}

                        <button className='cmc-quiz-button' onClick={() => addQuizComponent(null)}>Add Question</button>
                    </div>
                    <QuizNavigation alterFormData={alterFormData} questionTracker={questionTracker} tagTracker={tagTracker} quizPoints={totalScore} fetchedQuizTags={formData['examinationTags']}/>
                    
                 </div>     
                {/* {activeTab === 'shared' && (                    

                )} */}                
                </div>
                {isPopupMinimized ? <div className={`popup-book ${isPopupMinimized ? 'minimized' : ''}`} onClick={togglePopup}><FaBook className='book-itself'/></div> : (
                    <div className={`selected-questions-popup ${selectedQuestions.length > 0 ? 'show' : ''} ${isPopupMinimized ? 'minimized' : ''}`}>
                    <div className="popup-header" onClick={togglePopup}>
                        <h3>Selected Questions</h3>
                        <button>
                            <FaTimes onClick={togglePopup}/>
                        </button>
                    </div>
                    <div className="popup-body">
                        
                        {selectedQuestions.map((question, index) => (
                            <div key={index}>
                                <p>{question}</p>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </FacultyOnly>
        </PageLayout>
    </>
    
  )
}

export default QuizEdit