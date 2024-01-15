import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

 interface UserForm {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
}

interface UserState {
  data: UserForm[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

interface User {
  email?: string;
  password?: string;
}
interface resetPassPayload {
  userId: string;
  confirmPass: string;
}

const initialState: UserState = {
  data: [] ,
  status: "idle",
  error: "",
};



// fetching data for login functionality
export const loginUser = createAsyncThunk('user/loginUser', async () => {
    const response = await fetch('http://localhost:3001/user');
    const users: User[] = await response.json();
    return users;
});

// post user data on api
export const userPostData = createAsyncThunk("userdata", async (requestData: UserForm) => {
  try {
    const response = await fetch("http://localhost:3001/user", {
      method: "POST",
    
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    return await response.json();
  } catch (error: any) {
    console.log(error.message, "data is not posted");
  }
});

 // update api (reset password)
export const resetPassword = createAsyncThunk('user/resetPassword', async ({ userId, confirmPass }: resetPassPayload) => {
  try {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirmPass: confirmPass }),
    });
    return await response.json();
  } catch (error) {
   console.log(error, "error")
  }
});


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userPostData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(userPostData.fulfilled, (state, action: PayloadAction<UserForm[]>) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(userPostData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(loginUser.pending, (state) => {
        state.status = 'loading';
    })
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
    })
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
    });
    builder.addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
    });
    builder.addCase(resetPassword.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'succeeded';
        state.data = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    });
  
  },
});

export default userSlice.reducer;
