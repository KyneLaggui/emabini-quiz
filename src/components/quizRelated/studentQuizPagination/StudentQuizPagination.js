import React, { useState } from 'react'
import './StudentQuizPagination.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_PAGE, selectCurrentPage } from '../../../redux/slice/quizPaginationSlice';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const StudentQuizPagination = ({ productsPerPage, totalQuizCards, handleSubmit}) => {

    const currentPage = useSelector(selectCurrentPage)
    let pageNumbers = []

    const dispatch = useDispatch();
    
    // Go to the next page
    const paginateNext = () => {
        dispatch(
            SET_CURRENT_PAGE(currentPage + 1)
        )
    }

    const paginatePrev = () => {
        dispatch(
            SET_CURRENT_PAGE(currentPage - 1)
        )
    }

    for (let i = 1; i <= Math.ceil(totalQuizCards / productsPerPage); i++) {
        pageNumbers.push(i);
    };

  return (
    <div className="quiz-pagination-container">
        <div onClick={paginatePrev} className={currentPage === pageNumbers[0] ? `hidden` : null}>
            <FaArrowLeft className='question-prev-arrow'/>
            <p>Previous Question</p>
        </div>
        {
            currentPage !== totalQuizCards ? (
            <div onClick={paginateNext} className={currentPage === pageNumbers[pageNumbers.length - 1] ? `hidden` : null}>
                <p>Next Question</p>
                <FaArrowRight className='question-next-arrow'/>
            </div>
            ) : (
                <div onClick={handleSubmit}>
                <p>Submit</p>
                <FaArrowRight className='question-next-arrow'/>
            </div>
            )
        }
        
    </div>
  )
}

export default StudentQuizPagination