import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

// Function to get token from cookies
function getToken() {
    return Cookies.get('token'); // Fetch the token stored in cookies
}

export async function getDetails(field) {
  const response = await axios.get(`http://localhost:3001/resume/${field}`,{
    headers: {
        Authorization: `Bearer ${getToken()}`, // Assuming you store JWT in localStorage
    },
  });
  return response.data;
}

export async function addDetails(field, data) {
  const response = await axios.post(`http://localhost:3001/resume/${field}`, data, {
    headers: {
        Authorization: `Bearer ${getToken()}`, // Assuming you store JWT in localStorage
    },}
)
  return response.data;
}    