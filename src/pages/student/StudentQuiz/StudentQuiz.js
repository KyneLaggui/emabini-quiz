import React, { useEffect, useState } from 'react'
import './StudentQuiz.scss';
import StudentQuizHeader from '../../../components/quizRelated/studentQuizHeader/StudentQuizHeader';
import Sidebar from '../../../components/Sidebar/Sidebar';
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import StudentQuizCard from '../../../components/quizRelated/StudentQuizCard/StudentQuizCard';
import { RESET_CURRENT_PAGE, selectCurrentPage } from '../../../redux/slice/quizPaginationSlice';
import { useDispatch, useSelector } from 'react-redux';
import StudentQuizPagination from '../../../components/quizRelated/studentQuizPagination/StudentQuizPagination';
import StudentQuizTracker from '../../../components/quizRelated/StudentQuizTracker/StudentQuizTracker';
import StudentOnly from '../../../layouts/studentOnly/StudentOnly';
import { useNavigate, useParams } from 'react-router-dom';
import FetchQuizInformation from '../../../customHooks/fetchQuizInformation';
import { supabase } from '../../../supabase/config';
import { current } from '@reduxjs/toolkit';
import QuizCard from '../../../components/quizRelated/QuizCard/QuizCard';
import Swal from 'sweetalert2';
import { selectEmail } from '../../../redux/slice/authSlice';

const StudentQuiz = () => {
  const dispatch = useDispatch();
  const studentEmail = useSelector(selectEmail)

  const [quizTaken, setQuizTaken] = useState(false)

  const [recentlyUpdated, setRecentlyUpdated] = useState(false)
  // Pagination states 
  const currentPage = useSelector(selectCurrentPage);
  const [productsPerPage] = useState(1);

  const [quizDetails, setQuizDetails] = useState({
    quizTitle: "",
    courseTitle: "",
    courseCode: "",
    duration: "",
    totalScore: 0
  })

  const {quizId} = useParams();

  const { fetchedQuizInfo } = FetchQuizInformation(quizId);

  const navigate = useNavigate()

  const [quizCards, setQuizCards] = useState([])
  
  useEffect(() => {
    dispatch(
      RESET_CURRENT_PAGE()
    )

    const getHeaderInfo = async() => {
      if (fetchedQuizInfo) {
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
            duration: fetchedQuizInfo['duration'],
            totalScore: fetchedQuizInfo['overall_score'],
            courseId: courseDetails.data['id']
          })

          setRemainingTime(fetchedQuizInfo['duration'] * 60);

          setQuizCards(fetchedQuizInfo['questions'])
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
        console.log(recentlyUpdated)            
        
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
    console.log(answerCompilation);
    Object.keys(answerCompilation).map((key) => {
      let questionPoints = checkAnswer(key, answerCompilation[key])
      totalScore += questionPoints
    })

    const questionAnswerKey = quizCards.map(quizCard => {
      // Initialize an empty object to store properties for each quiz card
      let tempStorage = {};
    
      // Extract question ID from the quiz card
      const questionId = quizCard.id;
    
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
      tempStorage['question_id'] = questionId;
      tempStorage['answer'] = rightAnswer;
      tempStorage['possibleScore'] = possibleScore;
      tempStorage['student_email'] = email;
      tempStorage['quiz_id'] = quizId
    
      // Return the object for the current quiz card
      return tempStorage;
    });

    const questionAnswerData = await supabase
    .from('question_answer')
    .insert(questionAnswerKey)

    console.log(questionAnswerData);

    const {data, error} = await supabase
    .from('quiz_grades')
    .insert({
      student_email: studentEmail,
      quiz_id: quizId,
      score: totalScore
    })

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

  return (
    <>
        <Sidebar />
        <PageLayout>
            <StudentOnly>
              {
                quizTaken ? 
                (
                  <p>Quiz taken</p>              
                )
                :
                (<div className="student-quiz-container">
                <div>
                  <StudentQuizHeader 
                    {...quizDetails} 
                    handleSubmit={handleSubmit} 
                    remainingTime={remainingTime} // Pass down remainingTime state
                    setRemainingTime={setRemainingTime} // Pass down setter function
                    showAnswer={showAnswer}
                  />
                    <div>
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
                    </div>
                    <StudentQuizPagination 
                      productsPerPage={productsPerPage}
                      totalQuizCards={quizCards.length}
                      handleSubmit={handleSubmit}
                    />
                </div>
                <StudentQuizTracker number={quizCards.length} />
                </div>)
              }        
             

            </StudentOnly>                       
        </PageLayout>
    </>
  )
}

export default StudentQuiz





 // Automically deem quiz as completed when the student clicks on the quiz
  // useEffect(() => {
  //   const updateQuizStatus = async() => {
  //     if (quizId) {
  //       const {data, error} = await supabase
  //       .from('quiz_assignment')
  //       .select()
  //       .eq('student_email', studentEmail)
  //       .eq('quiz_id', fetchedQuizInfo['id'])
  //       .single()
  //     }
  //   }
    
  //   updateQuizStatus()
  // }, [studentEmail])



  // const quizCards = [
  //   {
  //     'question': 'What is the powerhouse of the cell?',
  //     'choices': [
  //       'Mitochondira', 'Nucleus', 'Endoplasmic reticulum', 'Golgi apparatus'
  //     ],
  //     'answer': 'Mitochondria'
  //   },
  //   {
  //     'question': 'What is the chemical symbol for water?',
  //     'choices': [
  //       'O2', 'H2O', 'CO2', 'NaCl'
  //     ],
  //     'answer': 'Mitochondria'
  //   },
  //   {
  //     'question': 'Which planet is known as the "Red Planet"?',
  //     'choices': [
  //       'Venus', 'Mars', 'Jupiter', 'Saturn'
  //     ],
  //     'answer': 'Mars'
  //   },
  //   {
  //     'question': 'What is the smallest prime number?',
  //     'choices': [
  //       '0', '1', '2', '3'
  //     ],
  //     'answer': '1'
  //   },
  //   {
  //     'question': 'Which gas is most abundant in Earth\'s atmosphere?',
  //     'choices': [
  //       'Oxygen', 'Nitrogen', ' Carbon dioxide', 'Hydrogen'
  //     ],
  //     'answer': 'Hydrogen'
  //   }
  // ]
