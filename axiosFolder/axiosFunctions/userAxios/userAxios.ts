// import axios from '../../configurations/axiosLinkToBackend';

// const newAxios = axios.create({
//   baseURL: "http://localhost:3050/api/v1",
// });

// export const registerUser = async (body: any) => {
//     try {
//       const response = await newAxios.post("/users/register", body, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response;
//     } catch (error:any) {
//       return error.response;
//     }
//   };


//   export const loginUser = async(body: any) => {
//     try{
//       const response = await newAxios.post('/users/login', body)
//       return response
//     }catch(error:any){
//       return error.response
//     }
//   }


//   export const getUnrecordedPhrases = async(page?:number) => {
//     try{
//       const response = await newAxios.get(`/users/unrecorded-phrases?page=${page}`, {
//         headers: {
//         "Content-Type": "application/json"
//         }
//       })

//       return response
//     }catch(error:any){
//       return error.response
//     }
//   }