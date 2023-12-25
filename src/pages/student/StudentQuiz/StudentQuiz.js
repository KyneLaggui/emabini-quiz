import React, { useEffect, useState } from 'react'
import './StudentQuiz.scss';
import StudentQuizHeader from '../../../components/quizRelated/studentQuizHeader/StudentQuizHeader';
import Sidebar from '../../../components/Sidebar/Sidebar';
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import StudentQuizCard from '../../../components/quizRelated/StudentQuizCard/StudentQuizCard';
import { RESET_CURRENT_PAGE, selectCurrentPage } from '../../../redux/slice/quizPaginationSlice';
import { useDispatch, useSelector } from 'react-redux';
import StudentQuizPagination from '../../../components/quizRelated/studentQuizPagination/StudentQuizPagination';
import StudentQuizTracker from '../StudentQuizTracker/StudentQuizTracker';

const StudentQuiz = () => {
  const dispatch = useDispatch();

  // Pagination states 
  const currentPage = useSelector(selectCurrentPage);
  const [productsPerPage] = useState(1);
  
  useEffect(() => {
    dispatch(
      RESET_CURRENT_PAGE()
    )
  }, [dispatch])

  const quizCards = [
    {
      'question': 'What is the powerhouse of the cell?',
      'choices': [
        'Mitochondira', 'Nucleus', 'Endoplasmic reticulum', 'Golgi apparatus'
      ],
      'answer': 'Mitochondria'
    },
    {
      'question': 'What is the chemical symbol for water?',
      'choices': [
        'O2', 'H2O', 'CO2', 'NaCl'
      ],
      'answer': 'Mitochondria'
    },
    {
      'question': 'Which planet is known as the "Red Planet"?',
      'choices': [
        'Venus', 'Mars', 'Jupiter', 'Saturn'
      ],
      'answer': 'Mars'
    },
    {
      'question': 'What is the smallest prime number?',
      'choices': [
        '0', '1', '2', '3'
      ],
      'answer': '1'
    },
    {
      'question': 'Which gas is most abundant in Earth\'s atmosphere?',
      'choices': [
        'Oxygen', 'Nitrogen', ' Carbon dioxide', 'Hydrogen'
      ],
      'answer': 'Hydrogen'
    }
  ]
   // Get current products
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   // Numbering of the quiz cards
   for (let i = 0; i < quizCards.length; i++) {
    quizCards[i]['number'] = i + 1;
   }

   const currentQuestion = quizCards.slice(indexOfFirstProduct, indexOfLastProduct)

  return (
    <>
        <Sidebar />
        <PageLayout>
            <div className="student-quiz-container">
              <div>
                <StudentQuizHeader />
                  <div>
                    {
                      currentQuestion.map((quizCard, index) => (
                        <StudentQuizCard quiz={{...quizCard}} key={index}/>
                      ))
                    }
                  </div>
                  <StudentQuizPagination 
                    productsPerPage={productsPerPage}
                    totalQuizCards={quizCards.length}
                  />
              </div>
              <StudentQuizTracker number={quizCards.length} />
            </div>           
        </PageLayout>
    </>
  )
}

export default StudentQuiz