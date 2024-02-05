# Sample Frontend Client

This React frontend is to simply demonstrate how to interact with the Django endpoints in a React component architecture

## Basic Overview

These steps are assuming that the django backend is running on the same host as the frontend (but separate ports, runtime environments, and directories).

When starting the server on http://localhost:3000, the Home.js page loads and sends a GET request to Django to see which User is logged in.

Since no user has logged in yet, the page quickly reroutes to http://localhost:3000/LogIn/ to log in.

If you wish to sign up instead, just manually search http://localhost:3000/SignUp/ to create a new account.

When successfully registering, you are routed back to the log in page to log in.

When logging in, the LogIn page sends a POST method to http://localhost:8000/api/token/ with the user credentials to get a new JSON web token which gets automatically stored in the browser cookies.

The token will live in that browser session and is sent automatically as long as 'withCredentials' is set to true in the axiom http method parameters as seen in the components.

Setting withCredentials to true basically sends the browser cookies along with the request (and will be included in the response too). No matter if the user is logged into the browser or not, it's good to always send the browser cookies over even if they're blank.

Not demonstrated in this project yet, but when a token expires the client should send a POST to http://localhost:8000/api/token/refresh/ to refresh its token in the same manner.