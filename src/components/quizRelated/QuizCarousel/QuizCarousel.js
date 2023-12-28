import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './QuizCarousel.scss';


const QuizCarousel = ({ children }) => {
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        className: "center",
        centerMode: true,
        centerPadding: "10px",
        infinite: true,
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    centerPadding: "10px",
                }
            },
            {
              breakpoint: 1150,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                centerPadding: "10px",
              }
            },
            {
              breakpoint: 880,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: "80px",
              }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    className: "",
                    centerMode: false,
                }
              },
          ]
    };

    return (
        <Slider {...settings} className="owl-carousel">
            {children}
        </Slider>
    );
}
 
export default QuizCarousel;