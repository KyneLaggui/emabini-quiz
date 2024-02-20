import React, { useEffect, useRef, useState } from 'react'
import './StudentVideoQuiz.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import StudentQuizCard from '../../../components/quizRelated/StudentQuizCard/StudentQuizCard';
import { RESET_CURRENT_PAGE, selectCurrentPage } from '../../../redux/slice/quizPaginationSlice';
import { useDispatch, useSelector } from 'react-redux';
import StudentQuizPagination from '../../../components/quizRelated/studentQuizPagination/StudentQuizPagination';
import StudentQuizTracker from '../../../components/quizRelated/StudentQuizTracker/StudentQuizTracker';
import StudentOnly from '../../../layouts/studentOnly/StudentOnly';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FetchQuizInformation from '../../../customHooks/fetchQuizInformation';
import { supabase } from '../../../supabase/config';
import { current } from '@reduxjs/toolkit';
import QuizCard from '../../../components/quizRelated/QuizCard/QuizCard';
import Swal from 'sweetalert2';
import { selectEmail } from '../../../redux/slice/authSlice';
import StudentAnswerCard from '../../../components/quizRelated/StudentAnswerCard/StudentAnswerCard';
import { FaArrowLeft, FaClock } from 'react-icons/fa';
import StudentVideoQuizHeader from '../StudentVideoQuizHeader/StudentVideoQuizHeader';
import FetchVideoQuizInformation from '../../../customHooks/fetchVideoQuizInformation';
import StudentVideoQuizCard from '../../../components/quizRelated/StudentVideoQuizCard/StudentVideoQuizCard';

const StudentVideoQuiz = () => {
  const dispatch = useDispatch();
  const studentEmail = useSelector(selectEmail)

  const [quizTaken, setQuizTaken] = useState(false)

  const [recentlyUpdated, setRecentlyUpdated] = useState(false)
  // Pagination states 
  const currentPage = useSelector(selectCurrentPage);
  const [productsPerPage] = useState(1);

  // For video quizzing
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [src, setSrc] = useState(videoPreviewUrl);
  const [currentVidTime, setCurrentVidTime] = useState(0);
  const vidRef = useRef(null);

  const [quizDetails, setQuizDetails] = useState({
    quizTitle: "",
    courseTitle: "",
    courseCode: "",
    duration: "",
    totalScore: 0
  })

  const [completedTotalScore, setCompletedTotalScore] = useState(0)

  const {quizId} = useParams();

  const { fetchedQuizInfo } = FetchVideoQuizInformation(quizId);

  const navigate = useNavigate()

  const [quizCards, setQuizCards] = useState([])
  
  useEffect(() => {
    dispatch(
      RESET_CURRENT_PAGE()
    )

    const getHeaderInfo = async() => {
      if (fetchedQuizInfo) {
        console.log(fetchedQuizInfo)
        const {data} = await supabase
        .from('course')
        .select()
        .eq('code', fetchedQuizInfo['course_code'])
        .single()

        if (data) {  
          const courseDetails = await supabase.from('course')
          .select('id')
          .eq('code', fetchedQuizInfo['course_code'])
          .single()

          setQuizDetails({        
            quizTitle: fetchedQuizInfo['title'],
            courseTitle: data.name,
            courseCode: fetchedQuizInfo['course_code'],        
            totalScore: fetchedQuizInfo['overall_score'],
            courseId: courseDetails.data['id'],
            courseInstruction: fetchedQuizInfo['instruction']
          })

          setRemainingTime(fetchedQuizInfo['duration'] * 60);

          const questionsWithTrack = (fetchedQuizInfo['questions']).map((question) => {
            return {
              ...question,
              taken: false
            }
          })

          setQuizCards(questionsWithTrack)
          let scoresMap = {}
          fetchedQuizInfo['questions'].map((question) => {
            scoresMap[question.id] = question.points
          })
          setScoreCompilation(scoresMap)
        }

      }
    }

    getHeaderInfo()
  }, [dispatch, fetchedQuizInfo])

  useEffect(() => {
    const fetchTaken = async() => {
      if (fetchedQuizInfo && studentEmail) {    
        
        const {data, error} = await supabase
        .from('quiz_assignment')
        .select()
        .eq('student_email', studentEmail)
        .eq('quiz_id', fetchedQuizInfo['id'])
        .single()

        if (data && data.taken) {
          setQuizTaken(true)
        }

        // if (quizId) {
        //   const {data, error} = await supabase
        //   .from('quiz_assignment')
        //   .update({taken: true})
        //   .eq('student_email', studentEmail)
        //   .eq('quiz_id', fetchedQuizInfo['id'])
        //   .single()
        // }    
              
      }
    }    
    fetchTaken()
  }, [fetchedQuizInfo, studentEmail, quizId])

 
   // Get current products
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   // Numbering of the quiz cards
   for (let i = 0; i < quizCards.length; i++) {
    quizCards[i]['number'] = i + 1;
   }
   const currentQuestion = quizCards.slice(indexOfFirstProduct, indexOfLastProduct)

   const [scoreCompilation, setScoreCompilation] = useState({})
   const [answerCompilation, setAnswerCompilation] = useState({})
   

   const addAnswer = (ans, questionId, maxAnswers) => {
    
    const currentAnswers = answerCompilation[questionId]
    // In case the question already has an answer
    if (answerCompilation.hasOwnProperty(questionId) && currentAnswers.length < maxAnswers) {
      if (currentAnswers.includes(ans)) {
        let filteredArray = currentAnswers.filter(function(e) { return e !== ans })
        setAnswerCompilation({
          ...answerCompilation,
          [questionId]: filteredArray
        })
        return
      } 

      const newAnswers = [...currentAnswers, ans];
      setAnswerCompilation({
        ...answerCompilation,
        [questionId]: newAnswers
      })
    } else {
      setAnswerCompilation({
        ...answerCompilation,
        [questionId]: [ans]
      })
    }
  }

  // Chekcing individual answers for each question
  const checkAnswer = (answeredQuestionId, chosenAnswers) => {
    let isCorrect = true
    let possibleScore = 0;
    if (chosenAnswers === []) return 0

    // Iterate through every questions
    quizCards.map((quizCard) => {
      const questionId = quizCard['id']         
        if (questionId.toString() === answeredQuestionId.toString()) {
          if (chosenAnswers.length !== quizCard['answer'].length) {
            isCorrect = false;        
          }
          chosenAnswers.map((ans) => {
            const questionAnswers =  quizCard['answer']
            if (!(questionAnswers.includes(ans))) {
              isCorrect = false
            }
          })          

          // Determine the points of the question
          possibleScore = scoreCompilation[questionId]
        }      
    }) 

    // After checking if there is any wrong answer, evaluate the score
    return isCorrect ? possibleScore : 0;
}

  // Showing modal upon quiz completion
   const handleSubmit = async () => {
    let totalScore = 0;
    Object.keys(answerCompilation).map((key) => {
      let questionPoints = checkAnswer(key, answerCompilation[key])
      totalScore += questionPoints
    })

    const questionAnswerKey = quizCards.map(quizCard => {
      // Initialize an empty object to store properties for each quiz card
      let tempStorage = {};
    
      // Extract question ID from the quiz card
      const questionId = quizCard.id;

      // Extract choices for the question
      const choices = quizCard.choice
    
      // Find the right answer for the current question ID
      const rightAnswer = quizCard.answer;
    
      // Find the possible score for the current question ID
      const possibleScore = scoreCompilation[questionId];
    
      // Store the student's email
      const email = studentEmail;

      // If not answered
      let isFound = false;
      Object.keys(answerCompilation).map((key) => {
        if (questionId.toString() === key.toString()) {
          isFound = true;
          tempStorage['guess'] = answerCompilation[key]
          let questionPoints = checkAnswer(key, answerCompilation[key])
          if (questionPoints > 0) {
            tempStorage['isCorrect'] = true;
          } else {
            tempStorage['isCorrect'] = false;
          }
        }       
      })

      if (!isFound) {
        tempStorage['guess'] = [] 
        tempStorage['isCorrect'] = false;
      }
    
      // Populate the temporary storage object with the required properties
      tempStorage['choices'] = choices;
      tempStorage['question_id'] = questionId;
      tempStorage['answer'] = rightAnswer;
      tempStorage['possibleScore'] = possibleScore;
      tempStorage['student_email'] = email;
      tempStorage['quiz_id'] = quizId
    
      // Return the object for the current quiz card
      return tempStorage;
    });

    const questionAnswerData = await supabase
    .from('question_video_answer')
    .insert(questionAnswerKey)

    console.log(questionAnswerData.error);

    const {data, error} = await supabase
    .from('quiz_video_grades')
    .insert({
      student_email: studentEmail,
      quiz_id: quizId,
      score: totalScore
    })
    console.log(error)
   

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });  

      swalWithBootstrapButtons.fire({
        title: "Quiz successfully submitted!",
        text: `You scored ${totalScore} out of ${quizDetails['totalScore']}!`,
        icon: "success",
        confirmButtonText: "Confirm",
        reverseButtons: true,
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/student-courses/${quizDetails['courseId']}`)
        } 
      });
   }

   // Timer
   const [remainingTime, setRemainingTime] = useState(0);

   const showAnswer = () => {
    // console.log(answerCompilation)

   }

    // Automically deem quiz as completed when the student clicks on the quizz
//   useEffect(() => {
//     const updateQuizStatus = async() => {
//       if (quizId) {
//         const {data, error} = await supabase
//         .from('quiz_assignment')
//         .update({
//           taken: true
//         })
//         .eq('student_email', studentEmail)
//         .eq('quiz_id', fetchedQuizInfo['id'])
//         .single()
//       }
//     }
    
//     updateQuizStatus()
//   }, [studentEmail, fetchedQuizInfo])
  
   const [quizData, setQuizData] = useState([]);

   useEffect(() => {
     // Function to fetch data from Supabase
     async function fetchData() {
      if (studentEmail && fetchedQuizInfo){
          try {
            const { data, error } = await supabase.from('question_video_answer').select('*')
            .eq('student_email',studentEmail).eq('quiz_id', fetchedQuizInfo['id']);
            if (error) {
              throw error;
            }
            // Assuming your data structure is an array of objects with 'question' and 'answer' properties
            setQuizData(data);
          } catch (error) {
            console.error('Error fetching quiz data:', error.message);
          }
        }
    
        
      }
      fetchData();
        // Call the function to fetch data when the component mounts
   }, [studentEmail, fetchedQuizInfo]); 

   useEffect(() => {
    if (quizTaken) {
      async function fetchData() {
        console.log(studentEmail, quizId)
        const {data, error} = await supabase
        .from('quiz_grades')
        .select().eq('student_email', studentEmail).eq('quiz_id', quizId).single()

        setCompletedTotalScore(data.score)
        }

        fetchData()
      }
        
    }, [quizTaken, quizId])
    
    useEffect(() => {
        const getVideo = async() => {
            // const {data, error} =  await supabase
            // .storage 
            // .from('video_quiz')
            // .list(`${quizId}/`,{
            //     limit: 1,
            //     offset: 0,
            //     sortBy: { column: 'name', order: 'asc' },
            // })
            setSrc(`https://ysoivydntceylxsduxhh.supabase.co/storage/v1/object/public/video_quiz/${quizId}/${quizId}`)
        }

        getVideo();

    }, [quizId])

    const [currentQuestionPopup, setCurrentQuestionPopup] = useState(null);

    // Function to handle video time update
    const handleVideoTimeUpdate = (event) => {
        const currentTime = event.target.currentTime;
        setCurrentVidTime(Math.floor(currentTime));
        if (parseInt(currentTime) === parseInt()) {

        }
    };

    const emptyCurrent = () => {
      setCurrentQuestionPopup(null)
    }

    const [renderedQuestions, setRenderedQuestions] = useState(0)
    useEffect(() => {
      const newQuizCards = quizCards.map((quizCard) => {
        if (parseInt(quizCard['timestamp']) === parseInt(currentVidTime) && !quizCard['taken']) {
          setRenderedQuestions(renderedQuestions + 1)

          const currentQuestion = <StudentVideoQuizCard
          quiz={{...quizCard}} 
          key={renderedQuestions} 
          number={currentPage} 
          totalQuizCards={quizCards.length}
          addAnswer={addAnswer}  
          answerCompilation={answerCompilation}
          emptyCurrent={emptyCurrent}
          />
          setCurrentQuestionPopup(currentQuestion)

          vidRef.current.pause()
          return {
            ...quizCard,
            taken: true
          }
        }
        return quizCard
      })
      
      setQuizCards(newQuizCards)
    }, [currentVidTime])

    // Function to handle video end
    const handleVideoEnd = () => {
      // Perform any actions you want when the video ends
      handleSubmit()
    };

  return (
    <>
        <Sidebar />
        <PageLayout>
            <StudentOnly>
              {
                quizTaken ? 
                (
                  <>
                    {/* <StudentQuizCard number={quizCards.length}  />
                        */}
                    <div className='back-sq-page'>
                      <Link to="/student-courses" className='back-courses'>
                            <FaArrowLeft name='back-arrow'/>                        
                            <p>Back to Quizzes</p>
                        </Link>
                    </div>
                        
                    <div className='qt-container'>
                      
                      <div className='student-quiz-answer-container'>
                        {quizData.map((quizItem, index) => (
                          <div key={index}>
                            
                              <StudentAnswerCard quizItem={quizItem} number={index + 1} />
                          </div>
                          
                        ))} 
                      </div>
                      <div className='quiz-navigation'>
                        <div className='qn-top'>
                          <h1 className='qn-title'>{quizDetails.quizTitle}</h1>
                          <div className='qn-desc'>
                              <p className='eb-standard qn-duration'><FaClock /> {quizDetails.duration} minute/s |</p>
                              <p className='eb-standard'>Points: <span className='qn-score'>{completedTotalScore}/{quizDetails.totalScore}</span></p>
                          </div>
                       
                          
                        </div>
                        
                        <div className='qn-instruction'>
                          <p className='eb-standard'>Instructions</p>
                          <p className='qn-ins-text'>{quizDetails.courseInstruction}</p>
                        </div>
                        
                        <div className='sq-tracker'>
                          <StudentQuizTracker number={quizData.length} />
                        </div>
                          
                      </div>
                    </div>
                  </>        
                )
                :
                (<div className="student-quiz-container">
                <div>
                  <StudentVideoQuizHeader 
                    {...quizDetails} 
                    handleSubmit={handleSubmit} 
                    remainingTime={remainingTime} // Pass down remainingTime state
                    setRemainingTime={setRemainingTime} // Pass down setter function
                    showAnswer={showAnswer}
                  />

                                      {(
                        src && <div className="video-preview-container">
                            <video controls key={src} onTimeUpdate={handleVideoTimeUpdate} onEnded={handleVideoEnd} ref={vidRef}>
                                <source src={src}/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                    {/* <div>
                      {
                        currentQuestion.map((quizCard, index) => {                             
                          return (
                          <>
                            <StudentQuizCard 
                              quiz={{...quizCard}} 
                              key={index} 
                              number={currentPage} 
                              totalQuizCards={quizCards.length}
                              addAnswer={addAnswer}  
                              answerCompilation={answerCompilation}
                            />
                          </>
                          )
                        })
                      }
                    </div> */}
                    {/* <StudentQuizPagination 
                      productsPerPage={productsPerPage}
                      totalQuizCards={quizCards.length}
                      handleSubmit={handleSubmit}
                    /> */}
                </div>
                {currentQuestionPopup && (
                  currentQuestionPopup
                )}
                {/* <StudentQuizTracker number={quizCards.length} /> */}
                </div>)
              }        
             

            </StudentOnly>                       
        </PageLayout>
    </>
  )
}

export default StudentVideoQuiz

    

