import React, { useEffect, useState } from 'react'
import './StudentProgressCard.scss';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
} from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import FetchStudentGrades from '../../customHooks/fetchStudentGrades';
import FetchStudentProgress from '../../customHooks/fetchStudentProgress';

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
);

const StudentProgressCard = ({ name, code }) => {
    const [courseDetail, setCourseDetail] = useState({
        courseName: '',
        courseCode: '',
    })

    const studentEmail = useSelector(selectEmail);
    const grades = FetchStudentProgress(studentEmail, code)

    const [groupedGradesData, setGroupedGradesData] = useState([])

    const [data, setData] = useState({
    labels: ['Math', 'Science', 'Language', 'Social Studies', 'Sports', 'Arts'],
    datasets: [{
        label: 'Performance Grades',
        backgroundColor: ['#ff7400', '#ff0000', '#ffc100'],
        borderColor: 'white',
        data: [0, 0, 0, 0, 0, 0],
        }]
    })

    const options = {
        
        plugins:{
            legend:{
                display:false
            }
        },
        maintainAspectRatio: false
    }

    useEffect(() => {
        if (name && code) {
            setCourseDetail({
                courseCode: code,
                courseName: name
            })
        }
    }, [name, code])

    useEffect(() => {
        if (grades.length >= 1) {
            setGroupedGradesData(grades)
            
            const properLabels = grades.map((grade) => {
                return grade['title']
            })

            const properData = grades.map((grade) => {
                return grade['score']
            })

            setData({
                labels: Object.keys(grades),
                datasets: [{
                    label: properLabels,
                    backgroundColor: ['#ff7400', '#ff0000', '#ffc100', '#ff0000', '#ffc100', '#ff7400'  ],
                    borderColor: 'white',
                    data: properData,
                }]
            })
        } 
    }, [grades])

    return (
        <div className="progress-card-wrapper">
            <div className="progress-left-details">
                <div>
                    <p className="eb-titles">{courseDetail.courseName}</p>
                    <p className='eb-standard '>{courseDetail.courseCode}</p>
                </div>
                <div className="progress-card-percentages"> 
                    {
                        groupedGradesData.length >= 1 ? (
                            groupedGradesData.map((data) => {
                                return <p className='eb-standard'>{`${data.title}: `} <span className="progress-data-score">{`${data.score}`}</span></p>
                            })
                        ) : 
                        <>No quizzes taken on this Subject</>
                    }
                    {/* <p className='eb-standard'>Introduction to Operating Systems: 75%</p>
                    <p className='eb-standard'>Introduction to Operating Systems: 75%</p>
                    <p className='eb-standard'>Introduction to Operating Systems: 75%</p>
                    <p className='eb-standard'>Introduction to Operating Systems: 75%</p> */}
                </div>            
            </div>
            <div className="line-chart">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
}

export default StudentProgressCard