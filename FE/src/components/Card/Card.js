import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Card(props) {

    const {item} = props;
    return (
        <div className='p-3'>
            <div class="border border-gray-400 shadow group relative text-sm overflow-hidden w-full">
                <div>
                    <div class=" relative">
                        <img class="object-cover h-52 w-full border-b border-gray-300" src={item.hinhAnh} alt="" />
                    </div>
                    <div class="m-5 relative ">
                        <div class=" items-center font-semibold text-sm text-cyan-700 truncate">
                            {item.tenPhim}
                        </div>
                        <div class="flex justify-between text-red-600 font-semibold text-base mt-2 items-center">
                            <div class="text-xs">BUY NOW:</div>
                            <div>10000000 VND</div>
                        </div>
                        <div class=" flex justify-end mt-2 font-light text-xs">
                            <div class="">UPLOAD: 26/03/2022</div>
                        </div>
                    </div>
                    <div
                        class=" absolute bottom-0 w-full group-hover:visible group-hover:opacity-100 invisible opacity-0
                    bg-gray-300 duration-700 delay-200 mb-8 group-hover:mb-0 px-5 py-9">
                        <div class="flex justify-between mt-2">
                            <NavLink to={`/detail/${item.maPhim}`}
                                class="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                <span class="mx-auto">Detail</span>
                            </NavLink>
                            <a href="#"
                                class="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                <span class="mx-auto">Add to cart</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
