import { 
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { client } from '../../api/client';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
});

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

// export const selectAllUsers = state => state.users;

// export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);

export const { 
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users);

// const initialState = [
//     { id: '0', name: 'Tianna Jenkins' },
//     { id: '1', name: 'Kevin Grant' },
//     { id: '2', name: 'Madison Price' }
//   ];

export const usersSlicer = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
      // builder.addCase(fetchUsers.fulfilled, (state, action) => {
      //   return action.payload
      // });
      builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
    }
});

export default usersSlicer.reducer;