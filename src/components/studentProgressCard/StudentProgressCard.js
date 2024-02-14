import React from 'react'
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

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
);

const StudentProgressCard = ({ courseTitle, courseCode }) => {
    const data = {
        labels: ['Math', 'Science', 'Language', 'Social Studies', 'Sports', 'Arts'],
        datasets: [{
            label: 'Performance Grades',
            backgroundColor: ['#ff7400', '#ff0000', '#ffc100'],
            borderColor: 'white',
            data: [10, 0, 90, 65, 50, 95],
        }]
    }

    const options = {
        
        plugins:{
            legend:{
                display:false
            }
        },
        maintainAspectRatio: false
    }


    return (
        <div className="progress-card-wrapper">
            <div className="progress-left-details">
                <div>
                    <p className="eb-titles">{courseTitle}</p>
                    <p className='eb-standard '>{courseCode}</p>
                </div>
                <div className="progress-card-percentages"> 
                    <p className='eb-standard'>Introduction to Operating Systems: 75%</p>
                    <p className='eb-standard'>Introduction to Operating Systems: 75%</p>
                    <p className='eb-standard'>Introduction to Operating Systems: 75%</p>
                    <p className='eb-standard'>Introduction to Operating Systems: 75%</p>
                </div>            
            </div>
            <div className="line-chart">
                <Doughnut data={data} options={options}/>
            </div>
        </div>
    )
}

export default StudentProgressCard