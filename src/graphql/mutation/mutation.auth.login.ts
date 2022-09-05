import { gql } from "@apollo/client";

const AUTH_LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
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

export default AUTH_LOGIN_MUTATION;
