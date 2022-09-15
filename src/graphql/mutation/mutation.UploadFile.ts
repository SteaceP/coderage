import { gql } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    upload(file: $file) {
      id
      name
    }
  }
`;

export default UPLOAD_FILE;
