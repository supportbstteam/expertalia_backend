import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userReducer";
import {
  nameModalReducer,
  aboutMeModalReducer, 
} from "./reducers/modalReducer";

export const store = configureStore({
  reducer: {       
    'name_modal':nameModalReducer,
    'about_me_modal':aboutMeModalReducer,    
    'user':userReducer,      
  },
});
//console.log(store.getState())