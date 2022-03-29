import React, { useEffect } from 'react';
import Card from '../../components/Card/Card'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import { useSelector, useDispatch } from 'react-redux';
import { getListProductAction } from '../../redux/actions/ProductManageAction';
import { NavLink } from 'react-router-dom';


export default function Category(props) {

    const { arrProduct } = useSelector(state => state.ProductManageReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = getListProductAction();
        dispatch(action);
    }, [])



    const renderProduct = () => {
        return arrProduct.slice(0, 12).map((item, index) => {
            return <div key={index}  >
                <Card item={item} />
            </div>
        })
    }

    return (
        <div>
            <HomeCarousel />
            <div className="pt-6 container">
                <nav aria-label="breadcrumb" className="w-full p-4 dark:bg-coolGray-800 dark:text-coolGray-100">
                    <ol className="flex h-8 space-x-2">
                        <li className="flex items-center">
                            <NavLink to="/" title="Back to homepage" className="hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 pr-1 dark:text-coolGray-400">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </NavLink>
                        </li>
                        <li className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-coolGray-600">
                                <path d="M32 30.031h-32l16-28.061z" />
                            </svg>
                            <a href="#" className="flex items-center px-1 capitalize hover:underline">Parent</a>
                        </li>
                        {/* <li className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-coolGray-600">
                                <path d="M32 30.031h-32l16-28.061z" />
                            </svg>
                            <a href="#" className="flex items-center px-1 capitalize hover:underline">Parent</a>
                        </li> */}
                        <li className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-coolGray-600">
                                <path d="M32 30.031h-32l16-28.061z" />
                            </svg>
                            <a href="#" className="flex items-center px-1 capitalize hover:underline hover:no-underline cursor-default">Current</a>
                        </li>
                    </ol>
                </nav>

                <h1 className="text-4xl text-center mb-10">Title</h1>
                <div class="grid grid-cols-4">
                    {renderProduct()}
                </div>
                <div className="flex justify-center space-x-1 dark:text-coolGray-100 py-10">
                    <button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-coolGray-900 dark:border-coolGray-800">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button type="button" title="Page 1" className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-coolGray-900 dark:text-violet-400 dark:border-violet-400">1</button>
                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-coolGray-900 dark:border-coolGray-800" title="Page 2">2</button>
                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-coolGray-900 dark:border-coolGray-800" title="Page 3">3</button>
                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-coolGray-900 dark:border-coolGray-800" title="Page 4">4</button>{/**/}
                    <button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-coolGray-900 dark:border-coolGray-800">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
