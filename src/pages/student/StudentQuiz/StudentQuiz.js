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
import { useParams } from 'react-router-dom';
import FetchQuizInformation from '../../../customHooks/fetchQuizInformation';
import { supabase } from '../../../supabase/config';
import { current } from '@reduxjs/toolkit';
import QuizCard from '../../../components/quizRelated/QuizCard/QuizCard';

const StudentQuiz = () => {
  const dispatch = useDispatch();

  // Pagination states 
  const currentPage = useSelector(selectCurrentPage);
  const [productsPerPage] = useState(1);

  const [quizDetails, setQuizDetails] = useState({
    quizTitle: "",
    courseTitle: "",
    courseCode: "",
    duration: ""
  })

  const {quizId} = useParams();

  const { fetchedQuizInfo } = FetchQuizInformation(quizId);

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
          setQuizDetails({        
            quizTitle: fetchedQuizInfo['title'],
            courseTitle: data.name,
            courseCode: fetchedQuizInfo['course_code'],        
            duration: fetchedQuizInfo['duration']
          })

          setQuizCards(fetchedQuizInfo['questions'])
          console.log(fetchedQuizInfo['questions'])
        }

      }
    }

    getHeaderInfo()
  }, [dispatch, fetchedQuizInfo])


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

   // Get current products
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   // Numbering of the quiz cards
   for (let i = 0; i < quizCards.length; i++) {
    quizCards[i]['number'] = i + 1;
   }
   const currentQuestion = quizCards.slice(indexOfFirstProduct, indexOfLastProduct)

   const [totalScore, setTotalScore] = useState(0)
   const [scoreCompilation, setScoreCompilation] = useState({})
   const [answerCompilation, setAnswerCompilation] = useState({})

   // Scoring logic
   const compileScore = (questionId, score) => {
    setScoreCompilation({
      ...answerCompilation,
      [questionId]: score
    })
   }

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
    if (chosenAnswers === []) return 0

    for (let i = 0; i < quizCards.length; i++) {
      const questionId = quizCards[i]['id'] 
      if (questionId === answeredQuestionId) {

      //   chosenAnswers.map((ans) => {
      //     if (!(answer.includes(ans))) {
      //         re
      //     }
      // })  
        const questionAnswers = quizCards[i]['answer'] 
        for (let i = 0; i < chosenAnswers.length; i++) {
          if (!(questionAnswers.includes(chosenAnswers[i]))) {
            return 0
          }
        }
      }

      const points = quizCards[i]['points'] 
      return points
    }      

    return 0
}

   const handleSubmit = () => {

    let totalScore = 0;
    Object.keys(answerCompilation).map((key) => {
      let questionPoints = checkAnswer(key, answerCompilation[key])

      totalScore += questionPoints
      // console.log(`${key}: ${answerCompilation[key]}`)
    })

    console.log(totalScore);
   }

  return (
    <>
        <Sidebar />
        <PageLayout>
            <StudentOnly>
              <div className="student-quiz-container">
                <div>
                  <StudentQuizHeader {...quizDetails}/>
                    <div>
                      {
                        currentQuestion.map((quizCard, index) => {                             
                          return (
                          <>
                            <StudentQuizCard 
                              quiz={{...quizCard}} 
                              key={index} 
                              number={currentPage} 
                              compileScore={compileScore} 
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
              </div>
              <button onClick={() => console.log(answerCompilation)}>Check</button>

            </StudentOnly>                       
        </PageLayout>
    </>
  )
}

export default StudentQuiz