import React from 'react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../../redux/actions/UserManageAction';

export default function Login(props) {


  const dispatch = useDispatch();

  const { userLogin } = useSelector(state => state.UserManageReducer);
  console.log('userLogin', userLogin);

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      // email: '',
    },
    onSubmit: values => {
      const action = LoginAction(values);
      dispatch(action);
      console.log('values', values);
    },
  });

  return (
    
    <form onSubmit={(event)=>{
      event.preventDefault();
      formik.handleSubmit(event);
    }} className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer" onClick={() => {
          history.push('/')
        }}>
          <div className="flex justify-between align-middle">
            <img src="https://lh3.googleusercontent.com/fife/AAWUweWv9SZbR3u9RncNlYTE-yjWI6grXgMkZo-nnIeJXlzaSqe5mAXfpp9owPQSFHpbtavjLbIVSZk0B7Hj_HFSqc7OfByMvZDXH6j5LyampXOgvL0BVsjN3WEZhJ0tOtXQiOA4mUIo3SOxIYFSh46zq5mAfpNGSfxHV_MJHakECrRbiA5TXyVmH46gUUOHB_LrMg0qA58lfqWA4ZEl23n-oh3bEodr5PwIzYTJ48eTK9dVtisUYMljNEcHFSVw_auu5cVuszOYi7ltK0Fn_9yTydxFd-bwXTuSDoKEjDsDCdV0OQqE2p_oZQfy-BePCRoa4cLIPpkOf2xc5HdfEkUq5a1AloSjughvlw-zRMFLrcOKOssx9Hgf4OnhF0VA7_3pYlGr9T_rx46ejX3QdjLNuapbPGCx_fp8ku7-DI-VbYz2d_dT2s0pO3I5BQcJmD0cJdtpeY-WlMh5C9xeYQ8TDT8hxscuIGaFn77Xj1P8bpcf70uBtKjxgpPaKIgM9QizECpJH3sdyqlpi_DDiVffC3B838RvNuK7qThkiJBewwPp6kt1MAzr4LDsuNBgM5LRgj_JIBB6jOJOCOHI98z6IUP8zWbA4kXE6iY2qn-Vn3w_ibB5OxwVYarDbtvMMH5qBasQnOhbWoUgtXJpD9PTjEdMU5t3f739vshqKlzvfUloBOft8aaEfDu2mdNqoJrXmUdAef1nilNSjQglD6WuGnN7Vvs3XBiEOKKGSge4LO0PUOcxNfoACEK_QE4XulbVnvJqhFRFxLOx0WzYD8UfBnA3cRiMSGAhEu1AE4SYt81o6SRw-zYhvO__uNSx3cLVpdVIDs-1WCfLoTjHaoKXVHd_ZScWmw=w1919-h819" className="w-14 h-14" alt="" />
            <p className="text-black text-4xl font-bold my-auto">GEAR <span className="text-red-600">ANT</span></p>
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
xl:text-bold">Log in</h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
              <input name="taiKhoan" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="mike@gmail.com" />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </div>
                <div>
                  <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                  cursor-pointer">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <input type="password" name="matKhau" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your password" />
            </div>
            <div className="mt-10">
              <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
          shadow-lg">
                Log In
              </button>
            </div>
          </div>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account ? <NavLink to="/register" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</NavLink>
          </div>
        </div>
      </div>
    </form>
  )
}
