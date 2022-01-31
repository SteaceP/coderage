import { gql } from "@apollo/client"

//! REMOVE UNUSED QUERY
//! GIVE A VARIABLE TO USER ID, THINK A LOGIC TO GET THE USER THAT IS CONNECTED

const AUTH_USER_QUERY = gql`
  query getUserInfo {
    usersPermissionsUser(id: 1) {
      data {
        id
        attributes {
          username
          provider
          email
          createdAt
          updatedAt
          provider
          confirmed
          picture {
            data {
              id
              attributes {
                size
                url
                previewUrl
                ext
                alternativeText
                name
                mime
                hash
                formats
              }
            }
          }
        }
      }
    }
  }
`

export default AUTH_USER_QUERY
