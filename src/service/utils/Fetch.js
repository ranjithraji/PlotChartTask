export const FETCH = async (options) => {

  const apiUrl = process.env.REACT_APP_API_URL;

  let token = localStorage.getItem("token");
  let response = {};
  let { url, method, body, authenticate = true, authToken } = options;

  let headers = {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (authenticate) {
    headers = { ...headers, Authorization: authToken ?? token };
  }

  let requestOptions = { method, headers, mode: 'cors' };

  if (method === "POST" || method === "PUT") {
    requestOptions = { ...requestOptions, body: body };
  }

  response = await fetch(apiUrl + url, requestOptions);
  if (response.ok) {
    return await response.json();
  }

  if (response.status === 401) {
  }

  let errorRes = await response.json();

  const responseError = {
    type: "Error",
    error: errorRes.error || errorRes.message || "Something went wrong",
    success: errorRes.success || false,
    invalid: errorRes.invalid || [],
  };

  throw responseError;
};
