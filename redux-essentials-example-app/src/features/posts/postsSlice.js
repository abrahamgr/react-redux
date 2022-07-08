import { 
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { client } from "../../api/client";

// import { sub } from 'date-fns';

// const initialState = [
//   { 
//       id: '1', 
//       title: 'First Post!', 
//       content: 'Hello!', 
//       date: sub(new Date(), { minutes: 10 }).toISOString(),
//       reactions: {
//         thumbsUp: 0,
//         hooray: 0,
//         heart: 0,
//         rocket: 0,
//         eyes: 0
//       }
//     },
//   { 
//       id: '2',
//       title: 'Second Post',
//       content: 'More text',
//       date: sub(new Date(), { minutes: 5 }).toISOString(),
//       reactions: {
//         thumbsUp: 0,
//         hooray: 0,
//         heart: 0,
//         rocket: 0,
//         eyes: 0
//       }
//     }
// ]

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data
  });

  export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    // The payload creator receives the partial `{title, content, user}` object
    async initialPost => {
      // We send the initial data to the fake API server
      const response = await client.post('/fakeApi/posts', initialPost)
      // The response includes the complete post object, including unique ID
      return response.data
    }
  );

// export const selectAllPosts = state => state.posts.posts;
// export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
);

const postsSlice = createSlice({
  name: 'posts',
//   initialState,
    initialState,
  reducers: {
    postAdded: {
        reducer(state, action){
            state.posts.push(action.payload);
        },
        prepare(title, content, userId) {
            return {
                payload: {
                  id: nanoid(),
                  title,
                  content,
                  user: userId,
                  date: new Date().toISOString(),
                }
            };
        }
    },
    postUpdated(state, action){
        const { id, title, content } = action.payload;
        // const existingPost = state.posts.find(post => post.id === id);
        const existingPost = state.entities[id];
        if (existingPost) {
            existingPost.title = title;
            existingPost.content = content;
        }
    },
    reactionAdded(state, action) {
        const { postId, reaction } = action.payload
        // const existingPost = state.posts.find(post => post.id === postId);
        const existingPost = state.entities[postId];
        if (existingPost) {
            existingPost.reactions[reaction]++;
        }
    }
  },
  extraReducers(builder) {
      // fetchPosts statuses comes from the createAsyncThunk function
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // // Add any fetched posts to the array
        // state.posts = state.posts.concat(action.payload)
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
      // builder.addCase(addNewPost.fulfilled, (state, action) => {
      //   // We can directly add the new post object to our posts array
      //   state.posts.push(action.payload)
      // });
      builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
  }
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer