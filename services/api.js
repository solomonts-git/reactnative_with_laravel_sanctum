import axiosLib from 'axios';

 const axios = axiosLib.create({
    baseURL:"http://192.168.56.1:8000/api",
    headers:{
        // 'Content-Type': "application/json",
        Accept:"application/json"
    }
});

export default axios;