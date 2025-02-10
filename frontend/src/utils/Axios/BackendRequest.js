import Cookies from 'js-cookie'; // Import js-cookie

// Function to get token from cookies
export function getToken() {
  return Cookies.get('token'); // Fetch the token stored in cookies
}

// Function to make GET requests
export async function getDetails(field) {
  const token = getToken();
  console.log('hello');
  const response = await fetch(`http://localhost:3001/resume/${field}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  console.log('hello');
  // console.log(await response.json());
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error('Failed to fetch details');
  }
  return response.json();
}

// Function to make POST requests
export async function addDetails(field, data) {
  const token = getToken();
  const response = await fetch(`http://localhost:3001/resume/${field}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error('Failed to add details');
  }
  return response.json();
}

// Function to make PUT requests
export async function updateDetails(field, id, data) {
  const token = getToken();
  const response = await fetch(`http://localhost:3001/resume/${field}/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error('Failed to update details');
  }
  return response.json();
}

// Function to make DELETE requests
export async function deleteDetails(field, id) {
  const token = getToken();
  const response = await fetch(`http://localhost:3001/resume/${field}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error('Failed to delete details');
  }
  return response.json();
}