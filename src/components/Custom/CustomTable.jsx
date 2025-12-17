import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import NoDataOverlay from "./NoData";

const CustomTable = ({
  rows = [],
  columns = [],
  rowCount,
  paginationModel,
  setPaginationModel,
  sortModel,
  handleSortModelChange,
  CustomToolbar,
  showToolbar = false,
  pageSizeOptions = [25, 50, 100],
  height,
  rowHeight = 30,
  title,
  ...props
}) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        height: height ? height : "calc(100vh - 115px)",
        backgroundColor: "#F4F5F7", // 🔹 image jaisa outer bg
        border: "1px solid #DFE1E6",
        borderRadius: "4px",

      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={rowHeight}
        pagination={!!paginationModel}
        paginationMode={paginationModel ? "server" : "client"}
        rowCount={paginationModel ? rowCount ?? 0 : undefined}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode={sortModel ? "server" : "client"}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        pageSizeOptions={pageSizeOptions}
        disableColumnMenu
        disableRowSelectionOnClick
        editMode="cell"
        slots={{
          toolbar: CustomToolbar,
          noRowsOverlay: NoDataOverlay,
          headerRow: () => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                height: 44,
                borderBottom: "1px solid #DFE1E6",
                backgroundColor: "#F4F5F7",
              }}
            >
              <Typography fontWeight={600} color="#172B4D">
                {title}{" "}
                {rowCount
                  ? `(${rowCount})`
                  : rows.length > 0
                  ? `(${rows.length})`
                  : ""}
              </Typography>
            </Box>
          ),
        }}
        slotProps={{
          pagination: {},
        }}
        showToolbar={showToolbar}
        enableStickyFooter
        sx={{
          border: "none",
          backgroundColor: "#FFFFFF",
          color: "#172B4D",
          fontSize: "14px",

          /* ===== HEADER ===== */
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F4F5F7",
            borderBottom: "1px solid #DFE1E6",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
          },

          /* ===== REMOVE HEADER OUTLINES ===== */
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none",
              borderRight: "1px solid #DFE1E6"
            },
          "& .MuiDataGrid-columnHeader:last-child": {
              borderRight: "none"
          },

          /* ===== ROWS ===== */
          "& .MuiDataGrid-row": {
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #DFE1E6",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F7F8FA",
          },

          /* ===== CELLS ===== */
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #DFE1E6",
            borderRight: "1px solid #DFE1E6",
          },
          '& .MuiDataGrid-cell:last-child': {
            borderRight: 'none',
          },

          /* ===== FOOTER ===== */
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#F4F5F7",
            borderTop: "1px solid #DFE1E6",
            minHeight: 44,
          },

          "& .MuiTablePagination-root": {
            color: "#172B4D",
          },

          /* ===== REMOVE FOCUS BORDER ===== */
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },

          [`& .${gridClasses.headerRow}`]: {
            borderBottom: "none",
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default React.memo(CustomTable);
