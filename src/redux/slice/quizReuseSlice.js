import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentQuestions: []
}

const quizReuseSlice = createSlice({
    name: 'quizReuse',
    initialState,
    reducers: {
        ADD_QUESTION(state, action) {
            const question = action.payload;
            state.currentQuestions.push(question);
        },
        REMOVE_QUESTION(state, action) {
            const question = action.payload;
            console.log(question)
        }
    }
})

export const { ADD_QUESTION, REMOVE_QUESTION } = quizReuseSlice.actions;

export const selectCurrentQuestions = (state) => state.quizReuse.currentQuestions;

export default quizReuseSlice.reducer;