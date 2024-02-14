import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentQuestions: localStorage.getItem("currentQuestions") 
    ? JSON.parse(localStorage.getItem("currentQuestions")) : [],
}

const quizReuseSlice = createSlice({
    name: 'quizReuse',
    initialState,
    reducers: {
        ADD_QUESTION(state, action) {
            const questionPayload = action.payload;
            if (localStorage.getItem("currentQuestions")) {
                let localQuestions = (JSON.parse(localStorage.getItem("currentQuestions"))).filter(
                    (q) => q['questionId']!== questionPayload['questionId'] // Assuming unique IDs
                );
    
                localQuestions.push(questionPayload)
                const uniqueValues = new Set(localQuestions.map(item => item.questionId)); // Create a Set of unique IDs
                const uniqueArray = localQuestions.filter(item => uniqueValues.has(item.questionId)); // Filter based on Set membership

                state.currentQuestions = uniqueArray
                localStorage.setItem("currentQuestions", JSON.stringify(state.currentQuestions));
            } else {
                state.currentQuestions.push(questionPayload)
                localStorage.setItem("currentQuestions", JSON.stringify(state.currentQuestions));
            }
        },
        REMOVE_QUESTION(state, action) {
            const questionPayload = action.payload;
            let localQuestions = (JSON.parse(localStorage.getItem("currentQuestions"))).filter(
                (q) => q['questionId']!== questionPayload['questionId'] // Assuming unique IDs
            );

            const uniqueValues = new Set(localQuestions.map(item => item.questionId)); // Create a Set of unique IDs
            const uniqueArray = localQuestions.filter(item => uniqueValues.has(item.questionId)); // Filter based on Set membership

            state.currentQuestions = uniqueArray
            localStorage.setItem("currentQuestions", JSON.stringify(state.currentQuestions));
        }
    }
})

export const { ADD_QUESTION, REMOVE_QUESTION } = quizReuseSlice.actions;

export const selectCurrentQuestions = (state) => state.quizReuse.currentQuestions;

export default quizReuseSlice.reducer;