import React, { useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';

const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

export default function HomeCarousel(props) {

    const { arrImg } = useSelector(state => state.CarouselReducer)

    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(getCarouselAction());
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const renderImg = () => {
        return arrImg.map((item, index) => {
            return <div key={index}>
                <div style={{...contentStyle, backgroundImage:`url(${item.hinhAnh})`}}>
                    <img src={item.hinhAnh} className="w-full opacity-0"/>
                </div>
            </div>
        })
    }

    return (
        <Slider {...settings}>
            {renderImg()}
        </Slider>
    )
}
