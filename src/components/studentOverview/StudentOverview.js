import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale
} from 'chart.js';

import { Radar } from 'react-chartjs-2';
import './StudentOverview.scss';

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale
);

const StudentOverview = () => {
    const data = {
        labels: ['Thing1', 'Thing2', 'Thing3', 'Thing4', 'Thing6'],
        datasets: [{
            label: [3, 6, 9],
            backgroundColor: 'aqua',
            borderColor: 'black',
            data: '5',
        }]
    }

    const options = {
        scales: {
            r: {
              ticks: {
                display: false // Hides the labels in the middle (numbers)
              }
            }
        },
        plugins:{
            legend:{
                display:false
            }
        }
    }

    return (
        <>
            <div className="student-overview-container">
                <p className="bold">My Overview</p>
               
                <div className="radar-chart">
                    <Radar
                        data = {data}
                        options = {options}
                    ></Radar>
                </div>                
            </div>
        </>
    );
}
 
export default StudentOverview;