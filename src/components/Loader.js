import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <div className="container d-flex justify-content-center">
      <Box sx={{ display: "flex" }}>
        <CircularProgress size="20rem" />
      </Box>
    </div>
  );
};

export default Loader;
