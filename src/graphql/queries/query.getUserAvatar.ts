import { gql } from "@apollo/client";

const GET_USER_AVATAR_QUERY = gql`
  query getUserPicture($id: ID!) {
    usersPermissionsUser(id: $id) {
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
