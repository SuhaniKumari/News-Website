import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: null,
    regions: null,
    breakingNews: null,
}

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        setCategories(state, value) {
            state.categories = value.payload
        },
        setRegions(state, value) {
            state.regions = value.payload
        },
        setBreakingNews(state, value){
            state.breakingNews = value.payload
        }
    }
})

export const { setCategories, setRegions, setBreakingNews } = categorySlice.actions;

export default categorySlice.reducer;