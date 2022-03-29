import React, {useEffect} from 'react';
import HomeMenu from './HomeMenu/HomeMenu';
//
import { useSelector, useDispatch } from 'react-redux';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import { getListProductAction } from '../../redux/actions/ProductManageAction';

export default function Home(props) {

  const { arrProduct } = useSelector(state => state.ProductManageReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = getListProductAction();
    dispatch(action);
  }, [])


  return (
    <div>
      <HomeCarousel/>
      <div className='my-5'>
        <h2 className="container text-3xl text-red-500">
          Upcoming
        </h2>
        <HomeMenu arrProduct={arrProduct}/>
        <h2 className="container text-3xl text-red-500">
          Best seller
        </h2>
        <HomeMenu arrProduct={arrProduct}/>
      </div>
    </div>

  )
}

