import { useContext } from "react";
import { Box, Alert, AlertTitle } from "@mui/material";

import CommentsContext from "contexts/CommentsProvider";

const ErrorBox = () => {
  const { errorHelperMessage } = useContext(CommentsContext);
  if (!errorHelperMessage) {
    return null;
  }
  return (
    <Box sx={{ py: 2 }}>
      <Alert severity="error">
        <AlertTitle>{errorHelperMessage}</AlertTitle>
      </Alert>
    </Box>
  );
};

export default ErrorBox;
