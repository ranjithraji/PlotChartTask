export const FETCH = async (options) => {
    let token = localStorage.getItem("token");
    let response = {};
    let { url, method, body, authenticate = true, authToken } = options;
  
    let headers = {
      "Content-Type": "application/json",
    };
  
    if (authenticate) {
      headers = { ...headers, Authorization: authToken ?? token };
    }
  
    let requestOptions = { method, headers };
  
    if (method === "POST" || method === "PUT") {
      requestOptions = { ...requestOptions, body: body };
    }
  
    response = await fetch(url, requestOptions);
    if (response.ok) {
      return await response.json();
    }
  
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.pathname = "/login";
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
  