import React, { useEffect, useRef, useState } from 'react';
import "./QuizCard.scss";
import { Link } from 'react-router-dom';
import { MdGroup } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { supabase } from '../../../supabase/config';

const QuizCard = ({ title, students, status, tags, activeTab, id, onDelete}) => {

  const qcuTagsContainer = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  const [studentsCount, setStudentsCount] = useState(0);

  const confirmDelete = (e) => {
    e.stopPropagation()

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteCourse = async() => {
          const {data, error} = await supabase.from('quiz')
          .delete()
          .eq('id', id)
          .select()

          if (!(error)) {
            Swal.fire({
              title: "Deleted!",
              text: "The quiz been deleted.",
              icon: "success"
            });

            onDelete()
          }
        }
        
        deleteCourse()
        
      }
    });
  }

  useEffect(() => {
    if (qcuTagsContainer.current) {
      const container = qcuTagsContainer.current;

      const handleMouseDown = (e) => {
          setIsMouseDown(true);
          setStartX(e.pageX - container.offsetLeft);
          setScrollLeft(container.scrollLeft);
      };
  
      const handleMouseUp = () => {
          setIsMouseDown(false);
      };
  
      const handleMouseLeave = () => {
          setIsMouseDown(false);
      };
  
      const handleMouseMove = (e) => {
          if (!isMouseDown) return;
          e.preventDefault();
          const x = e.pageX - container.offsetLeft;
          const walk = (x - startX) * 3; 
          container.scrollLeft = scrollLeft - walk;
      };
  
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mousemove', handleMouseMove);
  
      return () => {
          container.removeEventListener('mousedown', handleMouseDown);
          container.removeEventListener('mouseup', handleMouseUp);
          container.removeEventListener('mouseleave', handleMouseLeave);
          container.removeEventListener('mousemove', handleMouseMove);
      };
    }
    
  }, [isMouseDown, scrollLeft, startX]);

  useEffect(() => {
    if (students) {
      setStudentsCount(students.length)
    }
  }, [students])

  useEffect(() => {
    console.log(onDelete)
  }, [onDelete])

  const isExploreTab = activeTab === 'explore';

  return (
    <div className="quiz-card-container">
      
      <div className="quiz-card-cover">
          {status === "draft" && (
            <p className="draft-button">Draft</p>
          )}
      </div>
      <div className='quiz-card-wrapper'>
        <div className="quiz-card-detail">
          <p className="quiz-card-title">
            <Link to={`/create-multiple-choice-quiz/${id}`}>{title}</Link>
          </p>
          {studentsCount === 0 ? (
            <div className="quiz-card-user-container">
              <MdGroup />
              <p><span className='gray-cont'>Not currently shared</span></p>
            </div>
          ) : (
            <div className="quiz-card-user-container">
              {isExploreTab ? (
                  <div className='qcu-tags' ref={qcuTagsContainer}>
                      {tags.map((tag, index) => (          
                        <p className='yellow-cont' key={index}>{tag}</p>                                      
                  ))}
                  </div>
                ) : (
                    <>
                        <MdGroup />
                        <p>
                            Shared with <span className='gray-cont'>{studentsCount} people</span>
                        </p>
                    </>
                )}
            </div>
          )}
        </div>
        <IoIosMore />
      </div>
      <FaTrash className="trash-icon" onClick={(e) => confirmDelete(e)}/>
    </div>
  );
};

export default QuizCard;
