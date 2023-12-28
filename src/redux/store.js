import { configureStore, combineReducers } from "@reduxjs/toolkit";
import quizPaginationReducer from './slice/quizPaginationSlice'
import authReducer from "./slice/authSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    quizPagination: quizPaginationReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store;