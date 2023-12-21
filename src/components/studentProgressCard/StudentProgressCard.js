import React from 'react'
import './StudentProgressCard.scss';
import { 
    Chart as ChartJS,
    CategoryScale, 
    LinearScale} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale
)

const StudentProgressCard = ({ courseTitle, courseCode }) => {
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
        <div className="progress-card-wrapper">
            <div className="progress-left-details">
                <div>
                    <p className="bold medium-text">{courseTitle}</p>
                    <p>{courseCode}</p>
                </div>
                <div className="progress-card-percentages"> 
                    <p>Introduction to Operating Systems: 75%</p>
                    <p>WSL: 80%</p>
                    <p>Terminal: 25%</p>
                    <p>CPU Scheduling: 75%</p>
                </div>            
            </div>
            <div className="line-chart">
                <Line data={data} options={options}/>
            </div>
        </div>
    )
}

export default StudentProgressCard