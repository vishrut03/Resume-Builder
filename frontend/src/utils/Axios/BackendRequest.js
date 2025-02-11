import Cookies from 'js-cookie';
import axios from 'axios';

// Function to get token from cookies
export function getToken() {
  return Cookies.get('token');
}

// Function to make GET requests
export async function getDetails(field) {
  const token = getToken();
  // console.log('hello');

  try {
    const response = await axios.get(`http://localhost:3001/resume/${field}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('hello');
    return response.data;
  } catch (error) {
    console.error('Error fetching details:', error.response?.data || error.message);
    throw new Error('Failed to fetch details');
  }
}

// Function to make POST requests
export async function addDetails(field, data) {
  const token = getToken();

  try {
    const response = await axios.post(`http://localhost:3001/resume/${field}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding details:', error.response?.data || error.message);
    throw new Error('Failed to add details');
  }
}

// Function to make PUT requests
export async function updateDetails(field, id, data) {
  const token = getToken();

  try {
    const response = await axios.put(`http://localhost:3001/resume/${field}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating details:', error.response?.data || error.message);
    throw new Error('Failed to update details');
  }
}

// Function to make DELETE requests
export async function deleteDetails(field, id) {
  const token = getToken();

  try {
    const response = await axios.delete(`http://localhost:3001/resume/${field}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting details:', error.response?.data || error.message);
    throw new Error('Failed to delete details');
  }
}
