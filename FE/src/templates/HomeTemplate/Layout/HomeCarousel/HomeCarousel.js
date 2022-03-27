import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function HomeCarousel() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <div>
            <Slider {...settings}>
                <div>
                    <img src="https://picsum.photos/200" className="w-full h-80" />
                </div>
                <div>
                    <img src="https://picsum.photos/200" className="w-full h-80" />
                </div>
                <div>
                    <img src="https://picsum.photos/200" className="w-full h-80" />
                </div>
            </Slider>
        </div>

    )
}
