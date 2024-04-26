import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postsSlice from './postsSlice'; // Make sure the path is correct

const store = configureStore({
    reducer: {
        auth : authSlice,
        post : postsSlice,
        //TODO: add more slices here for posts
    }
});

export default store;