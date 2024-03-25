import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import layoutSlice, { persistConfig } from "../app/layout/layoutSlice";
import paytransferInterfaceSlice from "../app/modules/PayTransferInterface/payTransferInterfaceSlice";

export const rootReducer = combineReducers({
    layout: persistReducer(persistConfig, layoutSlice),
    paytransferInterface: paytransferInterfaceSlice,
});
