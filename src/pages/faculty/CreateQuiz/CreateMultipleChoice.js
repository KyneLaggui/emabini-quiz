import React, { useEffect, useState } from 'react'
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
import QuizNavigation from '../../../components/quizRelated/QuizNavigation/QuizNavigation'
import { selectUserID } from '../../../redux/slice/authSlice'
import { useSelector } from 'react-redux'
import FetchAllCourses from '../../../customHooks/fetchAllCourses'

const CreateMultipleChoice = () => {
    const [activeTab, setActiveTab] = useState('examination');
    const [allCourses, setAllCourses] = useState([]);

    const id = useSelector(selectUserID)

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

    const [quizComponents, setQuizComponents] = useState([<QuizCreation key={0} manipulateQuestion={alterQuestion} number={0} />]);

    const [formData, setFormData] = useState({
        title: "", 
        instructions: "",
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

    // Fetch all courses
    const {coursesData} = FetchAllCourses()

    const deleteCourse = async (id) => {
        const { error } = await supabase
        .from('quiz')
        .delete()
        .eq('id', id)
    }
    
    const addQuizComponent = () => {
        const newKey = quizComponents.length;   

        const newComponent = <QuizCreation key={newKey} manipulateQuestion={alterQuestion} number={newKey}/>;
        setQuizComponents([...quizComponents, newComponent]);

        // Update question and tag trackers when adding a new quiz component
        updateQuestionTracker();
        updateTagTracker();
      };

      // Form submission handler
      const handleCreate = async (status) => {    
        let hasError = false;

        console.log(formData);

        try {
            const { error, data } = await supabase
            .from('quiz')
            .insert([{
                title: formData['title'],
                instruction: formData['instructions'],
                overall_score: totalScore,
                tags: formData['examinationTags'],
                duration: formData['duration'],
                status,                                
                instructor_id: formData['instructorId'],
                course_code: formData['courseCode']
            }])
            .select()
            .single()

            if (error) {
                if (error.code === '23503') {
                    toast.error("Course code does not exist!")
                    hasError =  true;        
                    deleteCourse(data.id)            
                    return
                }                
            }

            if (data) {
                const quizId = data.id
                const questions = []
                for (let i = 0; i < questionData.length; i++) {
                    // Checking if all questions have a designated answer
                    questionData[i]['answerInput'].forEach(async (answer) => {
                        if (answer === '')  {
                            toast.error("All questions must have an answer")
                            deleteCourse(quizId)  
                            hasError = true
                            return
                        }
                    })

                    // Creation of the question rows
                    const newQuestion = {
                        question: questionData[i]['question'],
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

                
                if (!error && !hasError) {
                    const {data} = await supabase.from('course_enrollee')
                    .select('email')
                    .eq('course_code', formData['courseCode'])      
                    
                    const courseStudents = data.map((student) => {
                        return student['email']
                    })

                    const quizTakers = []
                    for (let i = 0; i < formData['students'].length; i++) {
                        if (!(courseStudents.includes(formData['students'][i]))) {                        
                            toast.error('The student is not enrolled in the proper course!')
                            deleteCourse(quizId)  
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
                    
                    if (!hasError) {
                        toast.success("Quiz created successfully!");
                    } else {
                        if (error && error.code === '23503') {
                            toast.error("Email does not exist in the database!")
                            deleteCourse(quizId)  
                            return
                        } else {
                            if (error) {
                                toast.error(error.message)
                            }
                        }
                    }
                }
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


    // Update total quiz points
    const [totalScore, setTotalScore] = useState(1);

    const updateTotalPoints = () => {
        let score = 0;
        
        console.log(questionData)
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

    useEffect(() => {
        setFormData({
            ...formData,
            instructorId: id
        })    
    }, [id])

    useEffect(() => {
        setAllCourses(coursesData)
    }, [coursesData])

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
                            <div className='cmc-input course-code'>
                                    <h1>Course Code:</h1>
                                    {/* <input type='text' placeholder='Enter Course Code...' name="courseCode" onChange={(e) => onInputHandleChange(e)} /> */}
                                    <select name="courseCode" id="" onChange={(e) => onInputHandleChange(e)} placeholder="Select course code">
                                        <option value="" disabled selected>Select a course code</option>
                                        {
                                            allCourses.map((course, index) => {
                                                const code = course.code;                                                                                            
                                                return <option value={code} key={index}>{code}</option>
                                            })
                                        }
                                    </select>
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
                            <button onClick={() => handleCreate('published')}>Create</button>
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

                        <button className='cmc-quiz-button' onClick={addQuizComponent}>Add Question</button>
                    </div>
                    <QuizNavigation alterFormData={alterFormData} questionTracker={questionTracker} tagTracker={tagTracker} quizPoints={totalScore}/>
                    
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