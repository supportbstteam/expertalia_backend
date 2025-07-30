"use client"
import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import { store } from "@/app/_library/redux/store";

const ReduxProvider = ({ children }) => {
   return (
    <>  
    <Provider store={store}>{children}</Provider>
    </>
  );
}
export default ReduxProvider
