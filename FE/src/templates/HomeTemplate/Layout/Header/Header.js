import React from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
export default function Header(props) {
    return (
        <div>
            <style dangerouslySetInnerHTML={{ __html: "\n.dropdown:hover > .dropdown-content {\n\tdisplay: block;\n}\n" }} />
            <header className="p-4 text-coolGray-100 bg-gray-900 text-white fixed bg-opacity-70 w-full z-10">
                <div className="container flex justify-between h-16 mx-auto">
                    <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
                        <img src="https://lh3.googleusercontent.com/fife/AAWUweWv9SZbR3u9RncNlYTE-yjWI6grXgMkZo-nnIeJXlzaSqe5mAXfpp9owPQSFHpbtavjLbIVSZk0B7Hj_HFSqc7OfByMvZDXH6j5LyampXOgvL0BVsjN3WEZhJ0tOtXQiOA4mUIo3SOxIYFSh46zq5mAfpNGSfxHV_MJHakECrRbiA5TXyVmH46gUUOHB_LrMg0qA58lfqWA4ZEl23n-oh3bEodr5PwIzYTJ48eTK9dVtisUYMljNEcHFSVw_auu5cVuszOYi7ltK0Fn_9yTydxFd-bwXTuSDoKEjDsDCdV0OQqE2p_oZQfy-BePCRoa4cLIPpkOf2xc5HdfEkUq5a1AloSjughvlw-zRMFLrcOKOssx9Hgf4OnhF0VA7_3pYlGr9T_rx46ejX3QdjLNuapbPGCx_fp8ku7-DI-VbYz2d_dT2s0pO3I5BQcJmD0cJdtpeY-WlMh5C9xeYQ8TDT8hxscuIGaFn77Xj1P8bpcf70uBtKjxgpPaKIgM9QizECpJH3sdyqlpi_DDiVffC3B838RvNuK7qThkiJBewwPp6kt1MAzr4LDsuNBgM5LRgj_JIBB6jOJOCOHI98z6IUP8zWbA4kXE6iY2qn-Vn3w_ibB5OxwVYarDbtvMMH5qBasQnOhbWoUgtXJpD9PTjEdMU5t3f739vshqKlzvfUloBOft8aaEfDu2mdNqoJrXmUdAef1nilNSjQglD6WuGnN7Vvs3XBiEOKKGSge4LO0PUOcxNfoACEK_QE4XulbVnvJqhFRFxLOx0WzYD8UfBnA3cRiMSGAhEu1AE4SYt81o6SRw-zYhvO__uNSx3cLVpdVIDs-1WCfLoTjHaoKXVHd_ZScWmw=w1919-h819" className="w-12 h-12" alt="" />
                        <p className="text-white text-2xl font-bold mb-0">GEAR <span className="text-red-600">ANT</span></p>
                    </NavLink>
                    <div className="flex items-center md:space-x-4">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                                    <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-red-600">
                                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                                    </svg>
                                </button>
                            </span>
                            <input type="search" name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-coolGray-800 text-black focus:dark:bg-coolGray-900" />
                        </div>
                    </div>

                    <ul className="items-stretch hidden space-x-3 lg:flex mb-0">
                        <li className="flex items-center">
                            <div className="dropdown inline-block relative ">
                                <button className="text-white py-2 px-4 rounded inline-flex cursor-pointer hover:text-red-600 duration-500 border-transparent text-lg">
                                    <span>Category</span>
                                </button>
                                <ul className="dropdown-content absolute hidden pt-1">
                                    <li className="dropdown">
                                        <NavLink className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-black hover:text-red-600" to="./category">Option 2</NavLink>
                                        <ul className="dropdown-content absolute hidden text-gray-700 pl-2 ml-20 -mt-10">
                                            <li>
                                                <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-black hover:text-red-600" href="#">Option 1-1</a>
                                            </li>
                                            <li>
                                                <a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-black hover:text-red-600" href="#">Option 1-2</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-black hover:text-red-600" href="#">Option 2</a>
                                        <ul className="dropdown-content absolute hidden text-gray-700 pl-2 ml-20 -mt-10">
                                            <li>
                                                <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-black hover:text-red-600" href="#">Option 2-1</a>
                                            </li>
                                            <li>
                                                <a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-black hover:text-red-600" href="#">Option 2-2</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-black hover:text-red-600" href="#">Option 3</a>
                                        <ul className="dropdown-content absolute hidden text-gray-700 pl-2 ml-20 -mt-10">
                                            <li>
                                                <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-black hover:text-red-600" href="#">Option 3-1</a>
                                            </li>
                                            <li>
                                                <a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-black hover:text-red-600" href="#">Option 3-2</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="flex">
                            <NavLink to="/contact" className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white hover:text-red-500 hover:border-red-500 duration-500 text-lg" activeClassName="border-red-500 text-red-500">Contact</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/cart" className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white hover:text-red-500 hover:border-red-500 duration-500 text-lg" activeClassName="border-red-500 text-red-500">Cart</NavLink>
                        </li>
                    </ul>

                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        <button onClick={() => {
                            history.push('/login')
                        }} className="self-center px-8 py-3 rounded border-2 border-transparent hover:border-red-500 hover:text-red-500 duration-500 text-lg">Sign in</button>
                        <button className="self-center px-8 py-3 rounded border-2 border-transparent hover:border-red-500 hover:text-red-500 duration-500 text-lg">Sign up</button>
                    </div>
                    <button title="Open menu" type="button" className="p-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    )
}
