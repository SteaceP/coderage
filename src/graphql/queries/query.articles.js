import { gql } from "@apollo/client"

const ARTICLES_QUERY = gql`
  query Posts {
    posts {
      data {
        attributes {
          slug
          title
          category {
            data {
              attributes {
                slug
                name
              }
            }
          }
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`

export default ARTICLES_QUERY
