import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import apiBaseUrl from "../apiConfig";
const initialState={
    user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const LoginUser=createAsyncThunk("user/loginUser",async(user,thunkAPI)=>{
    try{
        console.log(apiBaseUrl)
        const response=await axios.post(`${apiBaseUrl}/login`,
            {
            email:user.email,
            password:user.password
        },
        {
            withCredentials: true, // Add this if your backend uses cookies for authentication
        }
        
      //   {    
      //     withCredentials: true,
      //     headers:{
      //       'Content-Type': 'application/json',
      //       'Authorization': 'Bearer HRKU-5437a59c-9a06-48b3-9532-08eafb3f327b'
      //     },
          
      // crossDomain: true
      //   }
    // ).catch(error => {
    //     if (error.response) {
    //       // The server responded with a status code outside the 2xx range
    //       console.log('Error response:', error.response); eeeeeeeeeee
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       console.log('Error request:', error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an error
    //       console.log('Error message:', error.message);
    //     }
    //   });
        // return response.data;
)} catch(error){
        if(error.response){
            const message=error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
        return response.data;
    }
});

export const getMe=createAsyncThunk("user/getMe",async(_,thunkAPI)=>{
    try{
        const response=await axios.get(`${apiBaseUrl}/me`,{timeout: 5000},
             {  
      //           withCredentials: true,
      //           credentials:"include",
      //           headers:{
      //               'Content-Type': 'application/json',
      //               'Authorization': 'Bearer HRKU-5437a59c-9a06-48b3-9532-08eafb3f327b'

      //             },
      // crossDomain: true
        }

        ).catch(error => {
            if (error.response) {
              // The server responded with a status code outside the 2xx range
              console.log('Error response2:', error.response);
            } else if (error.request) {
              // The request was made but no response was received
              console.log('Error request2:', error.request);
            } else {
              // Something happened in setting up the request that triggered an error
              console.log('Error message2:', error.message);
            }
          });
        return response.data;
    } catch(error){
        if(error.response){
            const message=error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
})

export const LogOut=createAsyncThunk("user/LogOut",async()=>{
    
        await axios.delete(`${apiBaseUrl}/logout`);
       
    
})

export const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder.addCase(LoginUser.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(LoginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(LoginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message =action.payload;
        })

        //GET USER LOGIN
        builder.addCase(getMe.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(getMe.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(getMe.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message =action.payload;
        })
    }
})

export const {reset}=authSlice.actions;
export default authSlice.reducer;