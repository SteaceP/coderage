import { gql } from "@apollo/client";

const GET_USER_AVATAR_QUERY = gql`
  query getUserAvatar($userID: ID!) {
    usersPermissionsUser(id: $userID) {
      data {
        id
        attributes {
          username
          avatar {
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

export default GET_USER_AVATAR_QUERY;
