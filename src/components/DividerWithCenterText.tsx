import { FC } from "react";
import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const DividerStyle = styled("div")(({ theme }) => ({
  width: "60%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const DividerWithCenterText: FC = ({ children }) => {
  return (
    <>
      <DividerStyle>
        <Divider>{children}</Divider>
      </DividerStyle>
    </>
  );
};

export default DividerWithCenterText;
