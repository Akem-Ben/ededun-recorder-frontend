import axios from '../../configurations/axiosSetup'


export const addMovie = async(body:any)=>{
    try{
      const response = await axios.post("/movies/create-movie", body,{
        headers: {
            "Content-Type" : "application/json"
        }
      })
    return response
    }catch(error:any){
      return error.response
    }
}

export const allDatabaseMovies = async(query?:string, page?:number)=>{
    try{
        const response = await axios.get(`/movies/all-movies?search=${query}&page=${page}`)
        return response
    }catch(error:any){
        return error.response
      }
}

export const allUserMovies = async(query?:string, page?:number) => {
  try{
      const response = await axios.get(`/movies/user-movies?search=${query}&page=${page}`)
      return response
  }catch(error:any){
      return error.response
    }
}

export const singleMovie = async(id:string)=>{
  try{
    const response = await axios.get(`/movies/single-movie/${id}`)
    return response
}catch(error:any){
    return error.response
  }
}

export const editMovie = async(id:string, body:Record<string, any>)=>{
  try{
    const response = await axios.put(`/movies/update-movie/${id}`, body)
    return response
    
  }catch(error:any){
    return error.response
  }
}

export const editMovieImage = async(id:string, image:any)=>{
  try{
    const response = await axios.put(`/movies/update-movie-image/${id}`, image, 
      {
      headers: {
          "Content-Type" : "multipart/form-data"
      }
    }
    )
    return response
    
  }catch(error:any){
    return error.response
  }
}



export const uploadMovieImage = async(image:any)=>{
  try{
    const response = await axios.post(`/movies/upload-image`, image, {
      headers: {
          "Content-Type" : "multipart/form-data"
      }
    })
    return response
    
  }catch(error:any){
    return error.response
  }
}

export const deleteMovie = async(id:string)=>{
  try{
    const response = await axios.delete(`/movies/delete-single/${id}`)
    return response
    
  }catch(error:any){
    return error.response
  }
}