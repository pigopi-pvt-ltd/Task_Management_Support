import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import GetAppIcon from "@mui/icons-material/GetApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* ================= COMMON STYLES ================= */
const sectionHeaderStyle = {
  backgroundColor: "#f5f5f5",
  p: 0.8,
  px: 1.5,
  border: "1px solid #e0e0e0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const labelStyle = { color: "#666", fontSize: "12px", mb: 0.5 };
const valueStyle = { fontWeight: 500, fontSize: "13px" };

/* ================= WORKFLOW STEP COMPONENT ================= */
const WorkflowStep = ({ name, role, status, time, highlight }) => (
  <Box sx={{ mb: 4, position: "relative" }}>
    <CheckCircleIcon
      sx={{
        position: "absolute",
        left: "-32px",
        color: "#2e7d32",
        bgcolor: "white",
        fontSize: 22,
      }}
    />
    <Box sx={{ border: "1px solid #e0e0e0", p: 1.5, borderRadius: "4px" }}>
      <Typography sx={{ fontSize: 12, fontWeight: "bold", color: "#2e7d32" }}>
        {name}
      </Typography>
      <Typography sx={{ fontSize: 11, color: "#666" }}>{role}</Typography>

      <Typography
        sx={{
          fontSize: 12,
          mt: 1,
          fontWeight: highlight ? "bold" : 400,
          borderBottom: highlight ? "2px solid #9c27b0" : "none",
          display: highlight ? "inline-block" : "block",
        }}
      >
        {status} : {time}
      </Typography>

      <Box display="flex" alignItems="center" mt={1} sx={{ cursor: "pointer" }}>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mr: 0.5 }}>
          Comments
        </Typography>
        <ExpandMoreIcon fontSize="small" />
      </Box>
    </Box>
  </Box>
);

/* ================= MAIN COMPONENT ================= */
const Resolved = () => {
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", p: 0}}>
      {/* ================= HEADER ================= */}
      <Card sx={{ mb: 2, boxShadow: "0px 1px 3px rgba(0,0,0,0.15)" }}>
        <CardContent>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} md={9}>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip
                  label="Resolved"
                  size="small"
                  sx={{
                    bgcolor: "#2e7d32",
                    color: "#fff",
                    fontSize: 11,
                    height: 20,
                    borderRadius: "4px",
                    fontWeight: "bold",
                  }}
                />
                <Typography fontWeight="bold">
                  RFC No: 26107346 - Microsoft Teams - Enabling Recording
                </Typography>
              </Box>

              <Typography sx={{ mt: 1.5, fontSize: 13 }}>
                <strong>RFC Logged Date:</strong> 30 October 2025 3:49 PM
              </Typography>
              <Typography sx={{ mt: 0.5, fontSize: 13 }}>
                <strong>RFC Description:</strong> I am unable to screen recording,
                please provide.
              </Typography>

              <Button
                variant="outlined"
                startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 12 }} />}
                sx={{
                  mt: 2,
                  height: 30,
                  fontSize: 12,
                  textTransform: "none",
                }}
              >
                Back
              </Button>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  p: 2,
                  textAlign: "center",
                }}
              >
                <Typography fontWeight="bold" fontSize={13}>
                  Customer SLA
                </Typography>
                <Typography fontWeight="bold" fontSize={14}>
                  05/11/2025 9:49 AM
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ================= CONTENT ================= */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        {/* LEFT PANEL */}
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          <Box sx={{ bgcolor: "#fff", border: "1px solid #e0e0e0" }}>
            <Box sx={sectionHeaderStyle}>
              <Typography fontWeight="bold" fontSize={13}>
                Catalogue & Request Details
              </Typography>
              <ExpandMoreIcon fontSize="small" />
            </Box>

            <Box p={2}>
              <Box sx={{ bgcolor: "#eee", p: 1, mb: 2 }}>
                <Typography fontSize={12} fontWeight="bold">
                  Catalogue Details
                </Typography>
              </Box>

              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={4}>
                  <Typography sx={labelStyle}>Catalogue</Typography>
                  <Typography sx={valueStyle}>Collaboration</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography sx={labelStyle}>Catalogue Item</Typography>
                  <Typography sx={valueStyle}>Microsoft Teams</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography sx={labelStyle}>Type of Request</Typography>
                  <Typography sx={valueStyle}>
                    Enabling / Disabling
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ bgcolor: "#eee", p: 1, mb: 2 }}>
                <Typography fontSize={12} fontWeight="bold">
                  Request Details
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography sx={labelStyle}>RFC Raised For</Typography>
                  <Typography sx={valueStyle}>Project</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography sx={labelStyle}>RFC Start Date</Typography>
                  <Typography sx={valueStyle}>31/10/2025</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography sx={labelStyle}>RFC Expiry Date</Typography>
                  <Typography sx={valueStyle}>01/05/2026</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>

        {/* RIGHT PANEL */}
        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
          <Box sx={{ bgcolor: "#fff", border: "1px solid #e0e0e0" }}>
            <Box sx={sectionHeaderStyle}>
              <Typography fontWeight="bold" fontSize={13}>
                Workflow Details
              </Typography>
              <IconButton size="small" aria-label="download">
                <GetAppIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box p={2}>
              <Box
                sx={{
                  bgcolor: "#e3f2fd",
                  p: 1.5,
                  borderRadius: "4px",
                  mb: 3,
                }}
              >
                <Typography fontSize={12}>
                  Request has been Resolved by{" "}
                  <strong>ponnuswamy.maravath@tcs.com</strong> on Oct 31,
                  2025, 5:30 PM
                </Typography>
              </Box>

              <Box sx={{ position: "relative", pl: 4 }}>
                <Box
                  sx={{
                    position: "absolute",
                    left: 11,
                    top: 10,
                    bottom: 30,
                    width: 2,
                    bgcolor: "#e0e0e0",
                  }}
                />

                <WorkflowStep
                  name="anusha.lakkakula@tcs.com"
                  role="PL"
                  status="Approved on"
                  time="Oct 31, 2025, 3:38 PM"
                />

                <WorkflowStep
                  name="ponnuswamy.maravath@tcs.com"
                  role="Collab Implementer"
                  status="Resolved on"
                  time="Oct 31, 2025, 5:30 PM"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Resolved;
