import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

export default function ComingSoon({ text }) {
  const { id } = useParams();
  return (
    <div>
      <Typography
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        Page {id} is coming in a near future!
      </Typography>
    </div>
  );
}
