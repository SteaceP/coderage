import { gql } from "@apollo/client";

const CREATE_COMMENT = gql`
  mutation createComment {
  createComment(
    input: {
      relation: "api::post.post:1"
      content: "Hello World!"
      threadOf: 3
      author: { id: "1", name: "John Wick", email: "test@test.pl" }
    }
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
`;

export default CREATE_COMMENT;
