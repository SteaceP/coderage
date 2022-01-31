import { Box, CircularProgress } from "@mui/material"

const CircularLoading = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size={40} />
    </Box>
  )
}

export default CircularLoading
