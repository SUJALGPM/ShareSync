import axios from "axios";

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`http://localhost:9000/api/file/uploadFile`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}