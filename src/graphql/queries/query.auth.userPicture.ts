import { gql } from "@apollo/client";

const AUTH_USER_GETPICTURE = gql`
  query getUserPicture($userID: ID!) {
    usersPermissionsUser(id: $userID) {
      data {
        id
        attributes {
          username
          picture {
            data {
              attributes {
                url
                alternativeText
                formats
              }
            }
          }
        }
      }
    }
  }
`;

export default AUTH_USER_GETPICTURE;
