import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function HomeMenu(props) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
                <div className='px-3'>
                    <div class="border border-gray-400 shadow group relative text-sm overflow-hidden w-full">
                        <a href="#">
                            <div class=" relative">
                                <img class="object-cover h-52 w-full border-b border-gray-300"
                                    src="https://picsum.photos/200"
                                    alt="Sunset in the mountains" />
                                <div
                                    class=" absolute right-0 bottom-0 bg-gray-200 text-black font-semibold px-3 py-1 m-2 rounded-full border border-cyan-600">
                                    <h3 id="duration" class="testing mb-0">
                                        END: 31/03/2022
                                    </h3>
                                </div>
                                <div
                                    class=" absolute left-0 bottom-0 bg-gray-200 text-black font-semibold px-3 py-1 m-2 rounded-full border border-cyan-600"> bids
                                </div>
                            </div>
                            <div class="m-5 relative ">
                                <div class=" items-center font-semibold text-sm text-cyan-700 truncate">
                                    Tên nè
                                </div>
                                <div class="flex justify-between text-red-600 font-semibold text-base mt-2 items-center">

                                    <div class="text-xs">BUY NOW:</div>
                                    <div>10000000 VND</div>
                                </div>
                                <div class=" flex justify-between mt-2 font-light text-xs">
                                    <div class="">START: 500000</div>
                                    <div class="">UPLOAD: 26/03/2022</div>
                                </div>

                                <div class=" h-1 border-t border-gray-400 mt-2">

                                </div>
                            </div>
                            <div
                                class=" absolute bottom-0 w-full group-hover:visible group-hover:opacity-100 invisible opacity-0
                    bg-gray-300 duration-700 delay-200 mb-8 group-hover:mb-0 p-5">
                                <div class="flex justify-left items-center font-semibold text-sm">
                                    <div class="text-yellow-600">START PRICE</div>
                                </div>
                                <div class="flex justify-between text-yellow-600 font-semibold text-base mt-2">
                                    <div class=""> VND</div>
                                </div>
                                <div class=" mt-2 font-light text-xs">
                                    <div class="">END DATE: </div>
                                </div>
                                <div class=" h-1 border-t border-gray-400 mt-2">

                                </div>
                            </div>
                            <div
                                class=" absolute bottom-0 w-full group-hover:visible group-hover:opacity-100 invisible opacity-0
                    bg-gray-300 duration-700 delay-200 mb-8 group-hover:mb-0 p-5">
                                <div class="flex items-center font-semibold text-sm">
                                    <div class="text-yellow-600">CURRENT PRICE</div>
                                </div>
                                <div class="flex justify-between text-yellow-600 font-semibold text-base mt-2">
                                    <div class="">123456 VND</div>
                                </div>
                                <div class=" mt-2 font-light text-xs">
                                    <div class="flex font-semibold"><div class="mr-1 font-thin">On</div></div>
                                </div>

                                <div class=" h-1 border-t border-gray-400 mt-2"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='px-3'>
                    <div class="border border-gray-400 shadow group relative text-sm overflow-hidden w-full">
                        <a href="#">
                            <div class=" relative">
                                <img class="object-cover h-52 w-full border-b border-gray-300"
                                    src="https://picsum.photos/200"
                                    alt="Sunset in the mountains" />
                                <div
                                    class=" absolute right-0 bottom-0 bg-gray-200 text-black font-semibold px-3 py-1 m-2 rounded-full border border-cyan-600">
                                    <h3 id="duration" class="testing mb-0">
                                        END: 31/03/2022
                                    </h3>
                                </div>
                                <div
                                    class=" absolute left-0 bottom-0 bg-gray-200 text-black font-semibold px-3 py-1 m-2 rounded-full border border-cyan-600"> bids
                                </div>
                            </div>
                            <div class="m-5 relative ">
                                <div class=" items-center font-semibold text-sm text-cyan-700 truncate">
                                    Tên nè
                                </div>
                                <div class="flex justify-between text-red-600 font-semibold text-base mt-2 items-center">

                                    <div class="text-xs">BUY NOW:</div>
                                    <div>10000000 VND</div>
                                </div>
                                <div class=" flex justify-between mt-2 font-light text-xs">
                                    <div class="">START: 500000</div>
                                    <div class="">UPLOAD: 26/03/2022</div>
                                </div>

                                <div class=" h-1 border-t border-gray-400 mt-2">

                                </div>
                            </div>
                            <div
                                class=" absolute bottom-0 w-full group-hover:visible group-hover:opacity-100 invisible opacity-0
                    bg-gray-300 duration-700 delay-200 mb-8 group-hover:mb-0 p-5">
                                <div class="flex justify-left items-center font-semibold text-sm">
                                    <div class="text-yellow-600">START PRICE</div>
                                </div>
                                <div class="flex justify-between text-yellow-600 font-semibold text-base mt-2">
                                    <div class=""> VND</div>
                                </div>
                                <div class=" mt-2 font-light text-xs">
                                    <div class="">END DATE: </div>
                                </div>
                                <div class=" h-1 border-t border-gray-400 mt-2">

                                </div>
                            </div>
                            <div
                                class=" absolute bottom-0 w-full group-hover:visible group-hover:opacity-100 invisible opacity-0
                    bg-gray-300 duration-700 delay-200 mb-8 group-hover:mb-0 p-5">
                                <div class="flex items-center font-semibold text-sm">
                                    <div class="text-yellow-600">CURRENT PRICE</div>
                                </div>
                                <div class="flex justify-between text-yellow-600 font-semibold text-base mt-2">
                                    <div class="">123456 VND</div>
                                </div>
                                <div class=" mt-2 font-light text-xs">
                                    <div class="flex font-semibold"><div class="mr-1 font-thin">On</div></div>
                                </div>

                                <div class=" h-1 border-t border-gray-400 mt-2"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
                <div>
                    <h3>7</h3>
                </div>
                <div>
                    <h3>8</h3>
                </div>
                <div>
                    <h3>9</h3>
                </div>
            </Slider>
        </div>
    )
}
