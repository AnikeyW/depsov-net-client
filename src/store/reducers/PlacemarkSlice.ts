import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlacemark } from "../../models/IPlacemark"


interface PlacemarkState {
   placemarks: IPlacemark[];
   isLoading: boolean;
   error: string;
}

const initialState: PlacemarkState = {
   placemarks: [],
   isLoading: false,
   error: ''
}

export const placemarkSlice = createSlice({
   name: 'placemark',
   initialState,
   reducers: {
      addPlacemarkRequest(state) {
         state.isLoading = true;
      },
      addPlacemarkSuccess(state, action: PayloadAction<IPlacemark[]>) {
         state.isLoading = false;
         state.error = '';
         state.placemarks = action.payload;
      },
      addPlacemarkError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
      placemarksFetching(state) {
         state.isLoading = true;
      },
      placemarksFetchingSuccess(state, action: PayloadAction<IPlacemark[]>) {
         state.isLoading = false;
         state.error = '';
         state.placemarks = action.payload;
      },
      placemarksFetchingError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      }
   }
})

export default placemarkSlice.reducer;