import axios from "axios";
import { IPlacemark } from "../../models/IPlacemark";
import { AppDispatch } from "../store";
import { placemarkSlice } from "./PlacemarkSlice";


export const fetchPlacemarks = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(placemarkSlice.actions.placemarksFetching())
      const response = await axios.get<IPlacemark[]>('api/getplacemarks')
      // const response = await axios.get<IPlacemark[]>('http://localhost:5000/api/getplacemarks')
      dispatch(placemarkSlice.actions.placemarksFetchingSuccess(response.data))
   } catch (error) {
      console.error(error);
      dispatch(placemarkSlice.actions.placemarksFetchingError("Ошибка получения данных с сервера!"))
   }
}

interface IAddPlacemarkBody {
   latitude: number;
   longitude: number;
   isVerificated?: boolean;
   licensePlate?: string;
   description?: string;
}

export const addPlacemark = (body: IAddPlacemarkBody) => async (dispatch: AppDispatch) => {
   try {
      dispatch(placemarkSlice.actions.addPlacemarkRequest())
      const response = await axios.post<IPlacemark[]>('http://localhost:5000/api/addplacemark', body)
      dispatch(placemarkSlice.actions.addPlacemarkSuccess(response.data))
   } catch (error) {
      console.error(error);
      dispatch(placemarkSlice.actions.addPlacemarkError("Произошла ошибка при добавлении метки!"))
   }
}