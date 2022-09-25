import { Tooltip, TooltipProps, Fade } from "@mui/material";

const Tooltips: React.FC<TooltipProps> = ({ children, title, placement }) => (
  <Tooltip
    title={title}
    placement={placement}
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 500 }}
    arrow
  >
    {children}
  </Tooltip>
);

export default Tooltips;
