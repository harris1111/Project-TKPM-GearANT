import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from "react-redux";
import Card from '../../../components/Card/Card';
import styleSlick from './HomeMenu.module.css';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

const HomeMenu = (props) => {

    // const dispatch = useDispatch();

    const renderProduct = () => {
        return props.arrProduct.slice(0, 12).map((item, index) => {
            return <div key={index}  >
                <Card item={item} />
            </div>
        })
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        rows: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="my-10 container">
            {/* <h2> Multiple items </h2> */}
            <Slider {...settings}>
                {renderProduct()}
            </Slider>
        </div>
    );
}

export default HomeMenu;
