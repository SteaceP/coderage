import { gql } from "@apollo/client";

const AUTH_REGISTER_MUTATION = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
        confirmed
      }
    }
  }
`;

export default AUTH_REGISTER_MUTATION;
