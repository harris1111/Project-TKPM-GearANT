import React from 'react'

export default function AboutUS() {
    return (
        <section className="pt-40 py-6 dark:bg-coolGray-800 dark:text-coolGray-100">
            <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
                <p className="p-2 text-2xl font-medium tracking-wider text-center uppercase">Development team</p>
                <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">The talended people behind the scenes</h1>
                <div className="flex flex-row flex-wrap-reverse justify-center mt-8">
                    <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 dark:bg-coolGray-100 dark:text-coolGray-800">
                        <img alt className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-coolGray-500" src="https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-1/274253983_2130318060479891_3622453938097326377_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=miyvMsKY0mEAX8zgsgf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan3-5.fna&oh=00_AT_BK7wXFKfBMHlJUGFIYR8HXmiJYbThU6Z-qJclEXhKow&oe=6245F983" />
                        <div className="flex-1 my-4">
                            <p className="text-xl font-semibold leading-snug">Huynh Nhu Thanh</p>
                            <p>Web Developer</p>
                        </div>
                        <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                            <a href="mailto:19127067@student.hcmus.edu.vn" title="Email" className="dark:text-coolGray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </a>
                            {/* <a href="#" title="GitHub" className="dark:text-coolGray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
                                </svg>
                            </a> */}
                            <a href="https://www.facebook.com/thanhhoang4869" title="Facebook" className="flex items-center p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 dark:bg-coolGray-100 dark:text-coolGray-800">
                        <img alt className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-coolGray-500" src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-1/53459167_2115157368522146_1557156250184056832_n.jpg?stp=dst-jpg_p100x100&_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=z0cCA6FlR1wAX99PJdM&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan3-2.fna&oh=00_AT_94NiB2WO9TYKJXpjkl1QMCe_pFgyDqTp6Jp4IE88S9Q&oe=6264C14E" />
                        <div className="flex-1 my-4">
                            <p className="text-xl font-semibold leading-snug">Nguyen Minh An</p>
                            <p>BackEnd Developer</p>
                        </div>
                        <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                            <a href="mailto:19127010@student.hcmus.edu.vn" title="Email" className="dark:text-coolGray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </a>
                            {/* <a href="#" title="GitHub" className="dark:text-coolGray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
                                </svg>
                            </a> */}
                            <a href="https://www.facebook.com/nguyenminh.an.39" title="Facebook" className="flex items-center p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 dark:bg-coolGray-100 dark:text-coolGray-800">
                        <img alt className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-coolGray-500" src="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-9/60664027_2330892357152583_3954759582114381824_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=Rke7aXs7M-sAX9RdcOr&_nc_ht=scontent.fhan4-1.fna&oh=00_AT9zuX_Ed_oKy6noqh5KHdJC14acwfJAXR-Cga5hnmL0pQ&oe=6265662B" />
                        <div className="flex-1 my-4">
                            <p className="text-xl font-semibold leading-snug">Doan Huong Ngan</p>
                            <p>FrontEnd Developer</p>
                        </div>
                        <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                            <a href="mailto:19127049@student.hcmus.edu.vn" title="Email" className="dark:text-coolGray-900 hover:dark:text-violet-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </a>
                            {/* <a href="#" title="GitHub" className="dark:text-coolGray-900 hover:dark:text-violet-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
                                </svg>
                            </a> */}
                            <a href="https://www.facebook.com/ngan.doanhuong/" title="Facebook" className="flex items-center p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
