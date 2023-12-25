import { configureStore, combineReducers } from "@reduxjs/toolkit";
import quizPaginationReducer from './slice/quizPaginationSlice'

const rootReducer = combineReducers({
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