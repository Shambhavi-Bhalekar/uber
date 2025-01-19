# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. The user must provide their first name, last name, email, and password.

## Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname`: A string with at least 3 characters (required)
  - `lastname`: A string with at least 3 characters (optional)
- `email`: A valid email address (required)
- `password`: A string with at least 6 characters (required)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
### Success
- **Status Code**: `201 Created`
- **Body**:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "First name should atleast be 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Email is not valid",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password should atleast be 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
