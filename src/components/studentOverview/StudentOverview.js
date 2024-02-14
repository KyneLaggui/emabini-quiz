import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import './StudentOverview.scss';
import FetchStudentGrades from '../../customHooks/fetchStudentGrades';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import { useEffect, useState } from 'react';

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
);

const StudentOverview = () => {
    const studentEmail = useSelector(selectEmail);
    const grades = FetchStudentGrades(studentEmail)

    const [groupedGradesData, setGroupedGradesData] = useState({})
    // const data = {
    //     labels: ['Math', 'Science', 'Language', 'Social Studies', 'Sports', 'Arts'],
    //     datasets: [{
    //         label: 'Performance Grades',
    //         backgroundColor: ['#ff7400', '#ff0000', '#ffc100'],
    //         borderColor: 'white',
    //         data: [10, 0, 90, 65, 50, 95],
    //     }]
    // }

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
        if (grades) {
            setGroupedGradesData(grades)
            setData({
                labels: ['Math', 'Science', 'Language', 'Social Studies', 'Sports', 'Arts'],
                datasets: [{
                    label: 'Performance Grades',
                    backgroundColor: ['#ff7400', '#ff0000', '#ffc100', '#ff0000', '#ffc100', '#ff7400'  ],
                    borderColor: 'white',
                    data: [grades['Math'], grades['Science'], grades['Language'], grades['Social Studies'], grades['Sports'], grades['Arts']],
                }]
            })
        }
    }, [grades])

    return (
        <>
            <div className="student-overview-container">
                <p className="eb-semi-titles soc-title">My Overview</p>
                <div className='soc-contents'>
                    <div className='soc-scores'>
                        <h1>Math: <span className='soc-total'>{groupedGradesData.hasOwnProperty('Math') ? groupedGradesData['Math'] : 0}</span></h1>
                        <h1>Social Studies: <span className='soc-total'>{groupedGradesData.hasOwnProperty('Social Studies') ? groupedGradesData['Social Studies'] : 0}</span> </h1>
                        <h1>Sports: <span className='soc-total'>{groupedGradesData.hasOwnProperty('Sports') ? groupedGradesData['Sports'] : 0}</span> </h1>
                        <h1>Arts: <span className='soc-total'>{groupedGradesData.hasOwnProperty('Arts') ? groupedGradesData['Arts'] : 0}</span> </h1>
                        <h1>Science: <span className='soc-total'>{groupedGradesData.hasOwnProperty('Science') ? groupedGradesData['Science'] : 0}</span> </h1>
                        <h1>Language: <span className='soc-total'>{groupedGradesData.hasOwnProperty('Language') ? groupedGradesData['Language'] : 0}</span> </h1>
                    </div>
                
                    <div className="radar-chart">
                        <Doughnut
                            data = {data}
                            options = {options}
                        ></Doughnut>
                    </div>   
                </div>
                             
            </div>
        </>
    );
}
 
export default StudentOverview;