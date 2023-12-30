import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import './StudentProgressEach.scss'
import { FaArrowLeft } from 'react-icons/fa'
import QuizCardResult from '../../../components/quizRelated/QuizCardResult/QuizCardResult'
import { 
    Chart as ChartJS,
    CategoryScale, 
    LinearScale} from 'chart.js';
import { Line } from "react-chartjs-2";
import StudentOnly from '../../../layouts/studentOnly/StudentOnly'

ChartJS.register(
    CategoryScale,
    LinearScale
)

const StudentProgressEach = () => {

    let quizzes = [
        {
            'coverages': [
                {
                    'name': 'Homogeneous',
                    'score': 19,
                    'total': 40
                },
                {
                    'name': 'Non Homogeneous',
                    'score': 27,
                    'total': 30
                },
                {
                    'name': 'Laplace',
                    'score': 22,
                    'total': 30
                },
            ]
        },
        {
            'coverages': [
                {
                    'name': 'Inverse Laplace',
                    'score': 36,
                    'total': 60
                },
            ]
        },
        {
            'coverages': [
                {
                    'name': 'Matrix Representation',
                    'score': 26,
                    'total': 50
                },
                {
                    'name': 'Nodal Analysis',
                    'score': 28,
                    'total': 40
                },
            ]
        }
    ]
    
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "First dataset",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Second dataset",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774"
          }
        ]
      };

      const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        maintainAspectRatio: false
    }

  return (
    <>
    
        <Sidebar />
        <PageLayout>
            <StudentOnly>
                <div className="each-progress-wrapper">
                    <Link to='/student-progress' className='back-courses'>
                        <FaArrowLeft name='back-arrow'/>
                        <p>Back to Courses</p>
                    </Link> 
                    <div className='courses-title'>
                        <h1>Feedback and Control Systems</h1>
                        <p>CMPE 30123</p>
                    </div>
                    <div className="progress-bottom-container">
                        <div>
                            <p>Examinations</p>
                            <div className="quiz-cards-container">
                                {
                                    quizzes.length === 0 ? (
                                        <p>No quizzes yet.</p>
                                    ) : (
                                        quizzes.map((quiz, index) => (
                                            <QuizCardResult key={index} quiz={quiz} number={index} />
                                        ))
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <div className="line-chart">
                                <Line data={data} options={options}/>
                            </div>
                            <p className='bold'>Computed Grade</p>
                            <div className="progress-breakdown">
                                {
                                    quizzes.length === 0 ? (
                                        <>
                                            <p>No topics covered yet.</p>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                quizzes.map((quiz, index) => (
                                                    <div key={index}>
                                                        {quiz.coverages.map((coverage, coverageIndex) => (
                                                            <div className="breakdown-row" key={coverageIndex}>
                                                                <p>{coverage.name}</p>
                                                                <p>100%</p>
                                                            </div>                                                        
                                                        ))}
                                                    </div> 
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>         
            </StudentOnly>               
        </PageLayout>
    </>
  )
}

export default StudentProgressEach