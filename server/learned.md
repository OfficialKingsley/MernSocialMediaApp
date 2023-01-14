# What I learned

When building my api, I started with the authorization

That is the registration

## login

To login a user, the user sends some data like

- username
- password

### Steps to login

- Verify if the user exists
- Verify the password
- Return the user data and also a token

## Using token

To use the token, the user sends in the token as an `Authorization Header` when
sending the request

The token should be prefixed with `Bearer `

Next, you verify the token

## Error handlers

- Make an `errorHandler` middleware that you will be put at the end of the
  index.ts
- The `errorHandler` will be for other errors that are not related to the
  database
- Make an `errorResponse` util which will used for direct errors from the
  database response
