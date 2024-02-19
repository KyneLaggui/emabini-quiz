import React, { useEffect, useState } from 'react'
import "./CreateVideoQuiz.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'
import RecipientBox from '../../../components/courseRelated/recipientBox/RecipientBox'
import QuizCreation from '../../../components/courseRelated/quizCreation/QuizCreation'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { supabase } from '../../../supabase/config'
import VideoQuizNavigation from '../../../components/quizRelated/VideoQuizNavigation/VideoQuizNavigation'
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2'
import QuizCreationVideo from '../../../components/courseRelated/quizCreationVideo/QuizCreationVideo'
import { useSelector } from 'react-redux'
import { selectUserID } from '../../../redux/slice/authSlice'
import FetchAllCourses from '../../../customHooks/fetchAllCourses'

const CreateVideoQuiz = () => {
    const [activeTab, setActiveTab] = useState('examination');
    const [maxTimestamp, setMaxTimestamp] = useState(0);
    const [allCourses, setAllCourses] = useState([]);
    const [media, setMedia] = useState(null)
    // Fetch all courses
    const {coursesData} = FetchAllCourses()
    const id = useSelector(selectUserID)

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
        setQuestionData(newQuestions)
        updateTotalPoints();
    }

    const [formData, setFormData] = useState({
        title: "", 
        instructions: "",
        examinationTags: [],
        students: []
    }) 

    // Update quiz takers
    const modifyStudentRecipients = (newArr) => {
        setFormData({
            ...formData,
            students: newArr
        })
    } 

    const [questionData, setQuestionData] = useState([]) 

    // For Quiz navigation
    const alterFormData = (updatedQuizTags) => {
        const newFormData = {
            ...formData,
            examinationTags: updatedQuizTags
        }

        setFormData(newFormData)

        console.log(formData)
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

    const deleteCourse = async (id) => {
        const { error } = await supabase
        .from('quiz_video')
        .delete()
        .eq('id', id)
        console.log(error)
    }

    const addQuizComponent = (currentTime) => {
        const newKey = quizComponents.length;   

        // const newComponent = <QuizCreationVideo key={newKey} manipulateQuestion={alterQuestion} number={newKey} propMaxTimestamp={maxTimestamp}/>;
        const newComponent = {
            key: newKey,
            manipulateQuestion: alterQuestion,
            number: newKey,
            currentTime: currentTime
        };

        setQuizComponents([...quizComponents, newComponent]);

        // Update question and tag trackers when adding a new quiz component
        updateQuestionTracker();
        updateTagTracker();
      };


      // Form submission handler
      const handleCreate = async (status) => {    
        let hasError = false;

        try {
            console.log(questionData)
            const { error, data } = await supabase
            .from('quiz_video')
            .insert([{
                title: formData['title'],
                instruction: formData['instructions'],
                overall_score: totalScore,
                tags: formData['examinationTags'],
                status,                
                instructor_id: formData['instructorId'],
                course_code: formData['courseCode']
            }])
            .select()
            .single()
            if (data) {
                const questions = []
                const quizId = data.id
                for (let i = 0; i < questionData.length; i++) {
                    // Checking if all questions have a designated answer
                    questionData[i]['answerInput'].forEach(async (answer) => {
                        if (answer === '')  {
                            
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
                                title: 'All questions must have an answer',
                                
                            })

                            hasError =  true;        

                            deleteCourse(quizId)
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
                        number: questionData[i]['number'],
                        timestamp: questionData[i]['timestamp'],
                        duration: questionData[i]['duration'],
                    }

                    questions.push(newQuestion)        
                }    

                const { error } = await supabase.from('question_video')
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
                                title: 'The student is not enrolled in the proper course!',
                                
                            })
                            hasError = true
                            deleteCourse(quizId)  
                            return
                        }

                        const newTaker = {
                            student_email: formData['students'][i],
                            quiz_id: quizId
                        }

                        quizTakers.push(newTaker)
                    }

                    const { error } = await supabase.from('quiz_video_assignment')
                    .insert(quizTakers)
                    .select()
                    
                    if (!hasError) {
                        const videoUpload = await supabase
                        .storage
                        .from('video_quiz')
                        .upload(`${quizId}/${quizId}`, media)

                        console.log(videoUpload.error)
                        if (videoUpload.data) {
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
                                icon: 'success',
                                title: 'Quiz created successfully!',                                
                            })
                        } else {
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
                                title: 'Video upload failed',
                                
                            })
                        }
                        
                    } else {
                        if (error && error.code === '23503') {
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
                                title: 'Email does not exist in the database',
                                
                            })
                            deleteCourse(quizId)  
                            return
                        } else {
                            if (error) {
                                toast.error(error.message)
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
                                    title: error.message,
                                    
                                })
                            }
                        }
                    }
                }
            }
        } catch(error) {
           
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
                title: error.message,                
            })
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


    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
    const [src, setSrc] = useState(videoPreviewUrl);
    const [currentVidTime, setCurrentVidTime] = useState(0);

    // const [quizComponents, setQuizComponents] = useState([<QuizCreationVideo key={0} manipulateQuestion={alterQuestion} number={0}/>]);
    const [quizComponents, setQuizComponents] = useState([]);

    // Function to handle file upload
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]; 
        setMedia(file)
        const getVideoDuration = (file) =>
        new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const media = new Audio(reader.result);
            setVideoPreviewUrl(reader.result)
            media.onloadedmetadata = () => resolve(media.duration);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
        
        reader.onerror = error => reject(error);


        });

        const duration = await getVideoDuration(file);
        setMaxTimestamp(Math.floor(duration))
    };

    // Function to handle video time update
    const handleVideoTimeUpdate = (event) => {
        const currentTime = event.target.currentTime;
        setCurrentVidTime(Math.floor(currentTime));
    };

    useEffect(() => {
        setSrc(videoPreviewUrl)
    }, [videoPreviewUrl])

    // useEffect(() => {
    //     // updateTotalPoints();
    
    // }, [questionData])

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
                            </div>
                            <div className='cmc-bottom'>
                                <div className='cmc-input'>
                                        <h1>Quiz Instructions:</h1>
                                        <textarea type='text' placeholder='Enter Instructions...' name="instructions" onChange={(e) => onInputHandleChange(e)}  />
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
                            <VideoQuizNavigation  alterFormData={alterFormData} questionTracker={questionTracker} tagTracker={tagTracker} quizPoints={totalScore} propMaxTimestamp={maxTimestamp} />                            
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
                            <button onClick={() => handleCreate('completed')}>Create</button>
                            {/* <button onClick={() => handleCreate('draft')}>Save as draft</button> */}
                        </div>
                        
                    </div>
                
                {/* {activeTab === 'examination' && ( */}
                
                                                                                                               
                {/* )} */}
                <div className={`recipient-box-container ${activeTab === 'shared' ? '' : 'invisible'}`}>
                    <RecipientBox modifyStudentRecipients={modifyStudentRecipients}/>
                </div>
                <div className="questions-trackers-container">

                    <div className="video-quiz-container">
                    <div className='file-uploader-container'>
                        <label htmlFor='file-input' className='file-input-label'>
                            <FaPlus className='plus-icon' />
                            Upload File
                        </label>
                        <input
                            id='file-input'
                            type='file'
                            onChange={handleFileUpload}
                            className='file-input'
                            accept='video/*'
                        />
                    </div>
                    {(
                        src && <div className="video-preview-container">
                            <h2>Video Preview:</h2>
                            <video controls key={src} onTimeUpdate={handleVideoTimeUpdate}>
                                <source src={src}/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </div>
                <div className={`cmc-quiz-components ${activeTab === 'examination' ? '' : 'invisible'}`}>
                        {quizComponents.map((component, index) => (
                            <div key={index}>
                                <QuizCreationVideo 
                                    key={component.key} 
                                    manipulateQuestion={component.manipulateQuestion} 
                                    number={component.number}
                                    propMaxTimestamp={maxTimestamp}
                                    currentTime={component.currentTime}
                                />                                    
                                </div>
                            ))}

                        <button className='cmc-quiz-button' onClick={() => addQuizComponent(currentVidTime)}>Add Question</button>
                    </div>
                 </div>     
                {/* {activeTab === 'shared' && (                    
                )} */}                
                </div>
            </FacultyOnly>
        </PageLayout>
    </>
    
  )
}

export default CreateVideoQuiz