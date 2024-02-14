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

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
);

const StudentOverview = () => {
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
        <>
            <div className="student-overview-container">
                <p className="eb-semi-titles">My Overview</p>
                <div className='soc-contents'>
                    <div className='soc-scores'>
                        <h1>Math: <span className='soc-total'>100</span></h1>
                        <h1>Social Studies: </h1>
                        <h1>Sports: </h1>
                        <h1>Arts: </h1>
                        <h1>Science: </h1>
                        <h1>Language: </h1>
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