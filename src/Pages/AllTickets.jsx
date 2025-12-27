import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTable from "../components/Custom/CustomTable";
import axiosInstance from "../utils/axiosInstance";
import Snackbar from "../components/Snackbar/Snackbar";
import NoDataOverlay from "../components/Custom/NoData";
import UpdateTickets from "../components/Tickets/UpdateTickets";

const AllTickets = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 13,
  });
  const [rowCount, setRowCount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editTicket, setEditTicket] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditClick = (ticket) => {
    setEditTicket(ticket);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditTicket(null);
  };

  const handleUpdateSuccess = (message) => {
    setSnackbar({
      open: true,
      message: message,
      severity: "success",
    });
  };

  const handleUpdateError = (message) => {
    setSnackbar({
      open: true,
      message: message,
      severity: "error",
    });
  };

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/supportUsers/tickets", {
        params: {
          pageNum: paginationModel.page + 1,
          limit: paginationModel.pageSize,
        },
      });
      setTickets(response.data.data);
      setRowCount(response.data.totalTickets);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch tickets",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [paginationModel]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const statusColor = {
    pending: "warning",
    "in-progress": "info",
    resolved: "success",
    closed: "error",
  };

  const priorityColor = {
    low: "success",
    medium: "warning",
    high: "error",
  };

  const columns = [
    {
      field: "ticketId",
      headerName: "TICKET #ID",
      width: 120,
      align: "center",
      renderCell: (params) => (
        <Typography
          onClick={() => navigate(`/ticket/${params.row.id}`)}
          sx={{
            cursor: "pointer",
            color: "#1976d2",
            textDecoration: "underline",
            "&:hover": {
              color: "#0d47a1",
            },
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: "subject", headerName: "TICKET SUBJECT", width: 250 },
    { field: "ticketType", headerName: "TYPE", width: 150 },
    { field: "subType", headerName: "SUB-TYPE", width: 150 },
    {
      field: "createdAt",
      headerName: "CREATED DATE",
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "updatedAt",
      headerName: "UPDATED DATE",
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    { field: "createdByName", headerName: "AGENT", width: 150 },
    {
      field: "status",
      headerName: "STATUS",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value] || "default"}
          size="small"
        />
      ),
    },
    {
      field: "priority",
      headerName: "PRIORITY",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={priorityColor[params.value] || "default"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 120,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
              <IconButton onClick={() => handleEditClick(params.row)}>
                <EditIcon sx={{ color: "green" }} />
              </IconButton>
            </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 0.5,width:"100%", backgroundColor: "#f5f6f8", minHeight: "100vh" }}>
      {/* ================= Recent Tickets ================= */}
      <Box
        sx={{
          eveluation: 4,
          backgroundColor: "#f5f5f5",
          borderRadius: 0,
          overflowX: "visible",
          pb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 0.5,
            px: 0.5,
            height: 35,
          }}

        >
          <Typography variant="h6" fontWeight="600">
            Recent Tickets
          </Typography>
        </Box>

        <CustomTable
          rows={tickets}
          columns={columns}
          loading={loading}
          rowCount={rowCount}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          slots={{
            noRowsOverlay: NoDataOverlay,
          }}
          pageSizeOptions={[13, 25, 50, 100]}
          height="auto"
          // rowHeight={55}
        />
      </Box>

      {editTicket && (
        <UpdateTickets
          open={dialogOpen}
          onClose={handleCloseDialog}
          ticket={editTicket}
          onUpdated={fetchTickets}
          onUpdateSuccess={handleUpdateSuccess}
          onUpdateError={handleUpdateError}
        />
      )}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default AllTickets;
