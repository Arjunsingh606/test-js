import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

 export interface UserForm {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
}

interface UserState {
  data: UserForm[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  otp: string | null;
}

const initialState: UserState = {
  data: [],
  status: "idle",
  error:"" ,
  otp:""
};


// post user data at api
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



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserForm[]>) => {
      state.data = action.payload;
    },
    login: (state, action: PayloadAction<UserForm>) => {
      const { email, password } = action.payload;
      const user = state.data?.find((u) => u.email === email && u.password === password);

      if (user) {
        state.data = [user];
        state.status = "succeeded";
      } else {
        state.status = "failed";
        state.error = "Invalid credentials";
      }
    },
    forgetPassword:(state, action:PayloadAction<UserForm>)=>{
      const {email} = action.payload;
      const userEmail =  state.data?.find((u) => u.email === email)
      if(userEmail){
        state.data = [userEmail];
        state.status = "succeeded";
      } else {
        state.status = "failed";
        state.error = "Invalid credentials";
      }
    },
    // verifyOtp: (state, action: PayloadAction<string>) => {
    //   const enteredOtp = action.payload;

    //   if (state.otp === enteredOtp) {
    //     state.status = "succeeded";
    //     state.otp = null;
    //   } else {
    //     state.status = "failed";
    //     state.error = "Invalid OTP";
    //   }
    // },
  },
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
   
  },
 
});

export const { setUser, login, forgetPassword } = userSlice.actions;
export default userSlice.reducer;


