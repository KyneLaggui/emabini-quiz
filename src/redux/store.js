import { configureStore, combineReducers } from "@reduxjs/toolkit";
import quizPaginationReducer from './slice/quizPaginationSlice'
import authReducer from "./slice/authSlice";
import quizReuseReducer from "./slice/quizReuseSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    quizPagination: quizPaginationReducer,
    quizReuse: quizReuseReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store;