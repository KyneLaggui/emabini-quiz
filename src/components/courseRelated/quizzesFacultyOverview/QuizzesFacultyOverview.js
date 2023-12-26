import React, { useState } from 'react'
import "./QuizzesFacultyOverview.scss"
import CourseState from '../courseState/CourseState';
import { GiConfirmed } from 'react-icons/gi';
import { HiPencil } from 'react-icons/hi2';

const QuizzesFacultyOverview = () => {
    const [editingTopicIndex, setEditingTopicIndex] = useState(null);
    const [quizzes, setQuizzes] = useState([
      {
        quizTitle: 'CPU Scheduling Examination',
        quizDate: 'November 16, 2023',
        quizTime: '10:00am - 12:00pm',
        quizState: 'Done', 
        quizTopic: 'Lesson 1'
      },
      {
          quizTitle: 'Terminal Pop Quiz',
          quizDate: 'November 16, 2023',
          quizTime: '1:00pm - 2:00pm',
          quizState: 'Done',
          quizTopic: 'Lesson 1'
      },
      {
          quizTitle: 'Midterm Examination',
          quizDate: 'November 23, 2023',
          quizTime: '1:00pm - 2:00pm',
          quizState: 'Take Now',
          quizTopic: 'Assessment Skills'
      },
      {
          quizTitle: 'Finals Examination',
          quizDate: 'December 3, 2023',
          quizTime: '1:00pm - 2:00pm',
          quizState: 'Not Available',
          quizTopic: 'Departamentals Exam'
      },
    ]);
  

    const groupedQuizzes = quizzes.reduce((acc, quiz) => {
        const { quizTopic } = quiz;
        if (!acc[quizTopic]) {
          acc[quizTopic] = [];
        }
        acc[quizTopic].push(quiz);
        return acc;
      }, {});
    
      const handleEditClick = (index) => {
        setEditingTopicIndex(index);
      };
    
      const handleTopicChange = (event, topicIndex) => {
          const updatedQuizzes = quizzes.map((quiz) => {
            if (quiz.quizTopic === quizzes[topicIndex].quizTopic) {
              return {
                ...quiz,
                quizTopic: event.target.value,
              };
            }
            return quiz;
          });

        setQuizzes(updatedQuizzes);
      };
    
      const handleSaveClick = () => {
        setEditingTopicIndex(null);
        //Dito mo lagay yung save sa db
      };
    
    

      return (
        quizzes.length === 0 ? (
          <p>No quizzes found.</p>
        ) : (
          Object.keys(groupedQuizzes).map((quizTopic, index) => (
            <div key={index}>
              <div className='topic-editor'>
                  <div className='topic-container'>
                    {editingTopicIndex === index ? (
                      <input
                        type="text"
                        value={quizTopic}
                        onChange={(event) => handleTopicChange(event, index)}
                      />
                    ) : (
                      <h1 className='topic-titles'>{quizTopic}</h1>
                    )}
                  </div>
                  
                  <div className='edit-button'>
                    {editingTopicIndex === index ? (         
                        <GiConfirmed  onClick={handleSaveClick} size={23} color='var(--green)' />
                    ) : (
                        <HiPencil onClick={() => handleEditClick(index)} size={15} />
                    )}
                  
                  </div>
              </div>
              
              <div className='courses-quizzes'>
                {groupedQuizzes[quizTopic].map((quiz, i) => (
                  <CourseState {...quiz} key={i} />
                ))}
              </div>
            </div>
          ))
        )
      );
}

export default QuizzesFacultyOverview