# E-ease backend

# README for REST API

This README provides an overview of the REST API for E-ease and instructions for its easy usage.

## Table of Contents

- [Getting Started](#getting-started)
- [Endpoints](#endpoints)

  - [Register User](#register-user)
  - [Login User](#login-user)
  - [Logout User](#logout-user)
  - [Refresh User Access Token]('#refresh-access-token')
  - [Get All Users](#get-all-users)
  - [Delete User](#delete-user)
  - [Update User](#update-user)
  - [Assign User Role](#assign-user-role)
  - [Delete User Role](#delete-user-role)
  - [Get Products](#get-product)
  - [Add Product](#add-product)
  - [Update Product](#update-product)
  - [Delete Product](#delete-product)
  - [Add Product Review](#add-product-review)
  - [Get Product Review](#get-product-review)
  - [Get user cart](#fetch-cart)
  - [Add To Cart](#add-to-cart)
  - [Delete Item From Cart](#remove-item-from-cart)
  - [update Arrays of Item in Cart](#update-carts)

---

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository.
2. Install the required packages using the following command:

   ```bash
   npm install
   ```
3. Create an `.env` file in your project root folder and add your variables. See `.env.sample` for assistance.
---

### Usage
1. To start the server locally run this command

  ```bash
   npm run dev
  ``` 


## Endpoints

### Register User

#### Endpoint

##### POST /register

#### Request

To register a new user, make a `POST` request to the `/register` endpoint with the following JSON payload:

```json
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "example_password"
}

```

#### Response

- if the registration is successful, you will receive a response with a status code of 201 Created and a JSON object containing a message indicating that the user was created, along with the newly created user object:

```json
{
  "message": "User created",
  "user": {
    "username": "example_user",
    "email": "user@example.com",
    "id": "12345" // User ID
  }
}
```

- If there is a conflict (i.e., the username or email is already in use), you will receive a response with a status code of 409 Conflict and a message indicating that the username or email is already in use:

```json
{
  "message": "Username or email already in use"
}
```

- If any of the required fields (username, email, or password) are missing from the request, you will receive a response with a status code of 400 Bad Request and a message indicating that these fields are required:

```json
{
  "message": "username, email, and password are required"
}
```

#### Example Usage
You can use tools like Postman, cURL, or any HTTP client library in your preferred programming language to make a `POST` request to the 
`/register` endpoint.
##### Example Usage (Using `fetch`)

```javascript

const registerUser = async () => {
  const url = "http://localhost:3500/register";
  const data = {
    username: "example_user",
    email: "user@example.com",
    password: "example_password",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }

    const responseData = await response.json();
    console.log("User registered:", responseData);

  } catch (error) {
    console.error("Error registering user:", error.message);
  }
};

```

### Login User

#### Endpoint

##### POST /auth

#### Request

To authenticate a user, make a `POST` request to the `/auth` endpoint with the following JSON payload:

```json
{
  "username": "example_user",
  "password": "example_password" //User_password
}
```

#### Response

- If the authentication is successful, you will receive a response with a status code of 200 OK and a JSON object containing the access token and user information:

```json
{
  "accessToken": "example_access_token",
  "userInfo": {
    "username": "example_user",
    "email": "user@example.com",
    "id": "12345" // User ID
  }
}
```

- If either the username or password is missing from the request, you will receive a response with a status code of 400 Bad Request and a message indicating that these fields are required:

```json
{
  "message": "Username or password is missing"
}
```

- If the authentication fails (e.g., incorrect username or password), you will receive a response with a status code of 401 Unauthorized and a message indicating the error:

```json
{
  "message": "Authentication failed"
}
```


##### Example Usage
You can use tools like Postman, cURL, or any HTTP client library in your preferred programming language to make a `POST` request to the 
`/auth` endpoint.

##### Example Usage (Using `fetch`)

```javascript
try {
  const url = 'http://localhost:3500/auth';
  const data = {
    username: 'example_user',
    password: 'example_password'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message);
  }

  const responseData = await response.json();
  console.log('User authenticated:', responseData);
} catch (error) {
  console.error('Error authenticating user:', error.message);
}

```

### Logout User

#### Endpoint

##### GET /logout

#### Request
To log out a user, make a `GET` request to the `/logout` endpoint.

#### Response

- If the logout is successful, you will receive a response with a status code of `204 No Content`, indicating that the request was successful.

###### NOTE: Remember to delete the accessToken from the client side

#### Example Usage
You can use tools like Postman, cURL, or any HTTP client library in your preferred programming language to make a `GET` request to the 
`/logout` endpoint.
##### Example Usage (Using `fetch`)

```javascript

try {
  const url = 'http://localhost:3500/logout';

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include' // This ensures that cookies are sent along with the request
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message);
  }

  console.log('User logged out successfully');
} catch (error) {
  console.error('Error logging out user:', error.message);
}

```

### Refresh User Access Token

#### Endpoint

##### GET /refresh

#### Request
- To refresh the access token, make a `GET` request to the `/refresh` endpoint. The request should include the refresh token in the cookies.

#### Response

- If the refresh token is valid and belongs to a user, you will receive a response with a status code of `200 OK` and a new access token in the JSON body:


```json
{
  "accessToken": "new_access_token"
}

```

- If there is no refresh token in the cookies or the refresh token is invalid, you will receive a response with a status code of `401` Unauthorized or `403` Forbidden depending on the situation.


#### Example Usage
You can use tools like Postman, cURL, or any HTTP client library in your preferred programming language to make a `GET` request to the 
`/refresh` endpoint.
##### Example Usage (Using `fetch`)

```javascript

try {
  const url = 'http://localhost:3500/refresh';

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include' // This ensures that cookies are sent along with the request
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const responseData = await response.json();
  const newAccessToken = responseData.accessToken;

  console.log('New access token:', newAccessToken);
} catch (error) {
  console.error('Error refreshing access token:', error.message);
}

```