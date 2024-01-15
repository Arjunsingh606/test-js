const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchProducts = createAsyncThunk("fetchProduct", async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const getData = response.json();
    return getData;
  } catch (error) {
    console.log("Error", error);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    isloading: false,
    data: [],
    isError: false,
    count: 0,
  },
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export const { add, remove } = productSlice.actions;

export default productSlice.reducer;
