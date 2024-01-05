import React, { useState } from 'react'
import "./FacultyQuiz.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'
import SearchBar from '../../../components/filters/SearchBar'
import Sort from '../../../components/filters/Sort/Sort'
import QuizCard from '../../../components/quizRelated/QuizCard/QuizCard'

const FacultyQuiz = () => {
    const [activeTab, setActiveTab] = useState('my-examination');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const quizzes = [
        {
            quizName: 'CPU Scheduling Examination',
            quizUsers: '2 groups',
            quizState: 'Draft',
            quizTags: ['differential equation', 'biology', 'non homo']
        }, 
        {
            quizName: 'WSL Examination',
            quizUsers: 'Not currently shared',
            quizState: 'Draft',
            quizTags: ['cell', 'mitochondria', 'non homo']
        }, 
        {
            quizName: 'Homogeneous Examination',
            quizUsers: '24 People',
            quizState: 'Published',
            quizTags: ['math', 'science', 'non homo', 'non homo','differential equation','differential equation','differential equation','differential equation','differential equation',]
        }, 
        {
            quizName: 'Homogeneous Examination',
            quizUsers: '24 People',
            quizState: 'Published',
            quizTags: ['math', 'science', 'non homo']
        }, 
        {
            quizName: 'Homogeneous Examination',
            quizUsers: '24 People',
            quizState: 'Published',
            quizTags: ['differential equation', 'biology', 'non homo']
        }, 
        
    ]

    const filteredQuizzes = activeTab === 'explore'
        ? quizzes.filter(quiz => quiz.quizState === 'Published')
        : quizzes;

  return (
    <>
        <Sidebar/>
        <PageLayout>
            <FacultyOnly>
                <div className='quizzes-filters-container'>
                    <div className='quizzes-filters-left'>
                        <button>Create Quizzes</button>
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
                                <QuizCard {...quiz} key={i} activeTab={activeTab}/>
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
                                        <QuizCard {...quiz} key={i} activeTab={activeTab}/>
                                    )
                                })          
                            )              
                        }
                    </div>
                )}
                
            </FacultyOnly>
        </PageLayout>
    </>
    
  )
}

export default FacultyQuiz