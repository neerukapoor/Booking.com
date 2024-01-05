const apiUrl = 'http://localhost:3000/admin';


type LoginData = {
  email: string;
  password: string;
};


export const sendRequest = async (endpoint:string, method:string, data?: LoginData) => {
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
};