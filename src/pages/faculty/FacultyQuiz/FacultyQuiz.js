import React, { useEffect, useState } from 'react'
import "./FacultyQuiz.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'
import SearchBar from '../../../components/filters/SearchBar'
import Sort from '../../../components/filters/Sort/Sort'
import QuizCard from '../../../components/quizRelated/QuizCard/QuizCard'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import FetchQuizzesFaculty from '../../../customHooks/fetchQuizzesFaculty'
import { useSelector } from 'react-redux'
import { selectUserID } from '../../../redux/slice/authSlice'


Modal.setAppElement('#root');
const FacultyQuiz = () => {
    const [activeTab, setActiveTab] = useState('my-examination');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    // const quizzes = [
    //     {
    //         quizName: 'CPU Scheduling Examination',
    //         quizUsers: '2 groups',
    //         quizState: 'Draft',
    //         quizTags: ['differential equation', 'biology', 'non homo']
    //     }, 
        
    // ]

    const [quizzes, setQuizzes] = useState([]);

    const id = useSelector(selectUserID)

    const {quizzesData} = FetchQuizzesFaculty(id)

    const filteredQuizzes = activeTab === 'explore'
        ? quizzes.filter(quiz => quiz.status === 'published')
        : quizzes;
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [announcementView, setAnnouncementView] = useState(true);

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#F3F6FF',
        borderRadius: '5px',
        width: '100%',
        maxWidth: '600px',
        padding: '40px 40px 20px 40px'
      },
      
    };

    function openModal() {
        setIsOpen(true);
      }
    
    function closeModal() {
        setIsOpen(false);
    }

    const handleDelete = (id) => {
        setQuizzes(prevQuizzes => {
          return prevQuizzes.filter(quiz => quiz.id !== id)
        })
      }

    useEffect(() => {
        setQuizzes(quizzesData);
        console.log(quizzesData)
    }, [quizzesData])

  return (
    <>
        <Sidebar/>
        <PageLayout>
            <FacultyOnly>
                <div className='quizzes-filters-container'>
                    <div className='quizzes-filters-left'>
                        <button onClick={openModal}>Create Quizzes</button>
                    </div>
                    <div className='quizzes-filters-right'>
                        <SearchBar></SearchBar>
                        <Sort></Sort>
                    </div>                
                </div>
                <div className='fq-tabs'>
                    <button
                    className={activeTab === 'my-examination' ? 'active' : ''}
                    onClick={() => handleTabClick('my-examination')}
                    >
                    My Examination
                    </button>
                    <button
                    className={activeTab === 'explore' ? 'active' : ''}
                    onClick={() => handleTabClick('explore')}
                    >
                    Explore
                    </button>
                </div>
                {activeTab === 'my-examination' && (
            
                <div className='quizzes-orie'>
                    {filteredQuizzes.length === 0 ? (
                    <p>No quizzes found.</p>
                    ) : (
                        filteredQuizzes.map((quiz, i) => {
                            return (
                                <QuizCard {...quiz} key={i} activeTab={activeTab} onDelete={() => handleDelete(quiz.id)}/>
                            )
                        })          
                    )              
                }
                </div>
                        
                        
                
                )}
                {activeTab === 'explore' && (                    
                    <div className='quizzes-orie'>
                        {filteredQuizzes.length === 0 ? (
                            <p>No quizzes found.</p>
                            ) : (
                                filteredQuizzes.map((quiz, i) => {
                                    return (
                                        <QuizCard {...quiz} key={i} activeTab={activeTab} onDelete={() => handleDelete(quiz.id)}/>
                                    )
                                })          
                            )              
                        }
                    </div>
                )}
            
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Registration Modal"
                >
                    <div className='fq-choice-quiz-container'>
                        <Link to="/create-multiple-choice-quiz">
                            <div className='fq-mcs-container'>
                                <h1>Multiple Choice</h1>
                            </div>
                        </Link>
                        
                        <Link to="/create-video-quiz">
                            <div className='fq-vq-container'>
                                <h1 className='yellow'>Video Quizzing</h1>
                            </div>
                        </Link>
                        

                    </div>
                    

                </Modal>
            </div>
                
            </FacultyOnly>
        </PageLayout>
    </>
    
  )
}

export default FacultyQuiz