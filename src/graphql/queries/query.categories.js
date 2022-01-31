import { gql } from "@apollo/client"

const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      data {
        id
        attributes {
          slug
          Name
        }
      }
    }
  }
`

export default CATEGORIES_QUERY
