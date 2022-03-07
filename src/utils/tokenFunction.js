export const setToken=(userToken)=> {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }
  
export const getToken =()=> {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString)?JSON.parse(tokenString):null
  }

  export const removeToken=()=> {
    sessionStorage.removeItem('token');
  }  