export const setToken=(userToken)=> {
    sessionStorage.setItem('userToken', JSON.stringify(userToken));
  }
  
export const getToken =()=> {
    const tokenString = sessionStorage.getItem('userToken');
    return JSON.parse(tokenString)?JSON.parse(tokenString):null
  }

  export const removeToken=(userToken)=> {
    sessionStorage.removeItem('userToken');
  }  