import React, { useEffect } from 'react';
import './App.css';
import MapRegion from './components/MapRegion';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchPlacemarks } from './store/reducers/ActionCreators';

function App() {
  const dispatch = useAppDispatch()
  const { isLoading, placemarks } = useAppSelector(state => state.placemarkReducer)

  useEffect(() => {
    dispatch(fetchPlacemarks())
    setInterval(() => {
      dispatch(fetchPlacemarks())
    }, 5000)
  }, [])

  return (
    <MapRegion placemarks={placemarks} />
  );
}

export default App;
