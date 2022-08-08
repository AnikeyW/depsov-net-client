
import React, { FC, useState } from 'react';
import ReactDOMServer from "react-dom/server";
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import copCar from '../assets/police.png'
import { useAppDispatch } from '../hooks/redux';
import { IPlacemark } from '../models/IPlacemark';
import { addPlacemark } from '../store/reducers/ActionCreators';

const BalloonContentLayout = (layoutFactory: any, Component: any) => {
   const html = ReactDOMServer.renderToString(Component);
   const Layout = layoutFactory.createClass(`<div id="balloon">${html}</div>`, {
      build: function () {
         Layout.superclass.build.call(this);
      }
   });

   return Layout;
};

const Balloon: FC<BalloonProps> = ({ placemark }) => {
   return (
      <div>
         <h1>{placemark.latitude}</h1>
         <h1>{placemark.longitude}</h1>
      </div>
   )
}


interface BalloonProps {
   placemark: IPlacemark
}
interface MapRegionProps {
   placemarks: IPlacemark[]
}

const MapRegion: FC<MapRegionProps> = ({ placemarks }) => {
   const dispatch = useAppDispatch()
   const [ymaps, setYmaps] = useState<any>(null)

   const clickHandler = (e: any) => {
      dispatch(addPlacemark({
         latitude: e.get('coords')[0],
         longitude: e.get('coords')[1]
      }))
   }
   return (
      <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
         <Map
            defaultState={{
               center: [41, 69],
               zoom: 4
            }}
            onClick={clickHandler}
            onLoad={ymaps => setYmaps(ymaps)}
            style={{ width: "100%", height: "100%" }}
            height={'100%'}
         >
            {placemarks.map((placemark, i) =>
               <Placemark
                  key={i}
                  geometry={[placemark.latitude, placemark.longitude]}
                  options={
                     {
                        iconLayout: 'default#image',
                        iconImageHref: copCar,
                        iconImageSize: [35, 35],
                        balloonContentLayout: ymaps ? BalloonContentLayout(
                           ymaps.templateLayoutFactory,
                           <Balloon placemark={placemark} />
                        ) : null
                     }
                  }
               />
            )}
         </Map>
      </YMaps>
   );
};

export default MapRegion;