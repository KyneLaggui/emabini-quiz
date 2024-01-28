import React from 'react'
import "./AnswerStatus.scss"
import { IoIosArrowForward } from 'react-icons/io';

const AnswerStatus = () => {

    const studentStatus = [
        {
            studentName: 'Jason Buhain',
            quizStart: '10:00 AM',
            quizEnd: '12:00 PM',
            quizState: 'Done',
            quizScore: '100',
        },
        {
            studentName: 'Joseph Baturiano',
            quizStart: '10:00 AM',
            quizEnd: '12:00 PM',
            quizState: 'On-going',
            quizScore: '100',
        },
        {
            studentName: 'Kenneth Agarin',
            quizStart: '10:00 AM',
            quizEnd: '12:00 PM',
            quizState: '',
            quizScore: '100',
        }
    ]

  return (
    <div className='answer-status-container'>
        {studentStatus.map((student, index) => (
            <div className='answer-status-wrapper' key={index}>
                <div className='asc-left'>
                    <h1>{student.studentName}</h1>
                    <p>Started at {student.quizStart} | Finished at {student.quizEnd}</p>
                </div>
                <div className='asc-right'>
                    {student.quizState === 'Done' ? (
                        <div className='asc-done'>
                            <p className='asc-score'>{student.quizScore} / 100</p>
                            <p className='asc-percentage'>100%</p>
                        </div>
                    ) : student.quizState === 'On-going' ? (
                        <p className='asc-og'>On Going</p>
                    ) : (
                        <p className='asc-ns'>Not Started</p>
                    )}
                    <IoIosArrowForward />
                </div>
            </div>
        ))}
    </div>
    );
}

export default AnswerStatus