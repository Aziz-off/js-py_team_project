import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";

export default function PaginationControlled(props) {
  const { page, count, handleChange } = props;

  return (
    <Stack spacing={2}>
      <Typography  style={{ color: 'white',  }}>
        Page: {page}
      </Typography>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        sx={{ '& .MuiPaginationItem-page': { color: 'white', background: "#ff7f50"} }}
      />
    </Stack>
  );
};
