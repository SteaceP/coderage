import { gql } from "@apollo/client";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($payload: Object!) {
  createComment(
    input: {$payload}
  ) {
    id
    content
    threadOf {
      id
    }
    author {
      id
      name
    }
  }
}
`

export default CREATE_COMMENT_MUTATION