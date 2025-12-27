import {
  Box,
  Typography,
  Paper,
  Stack,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { useState } from "react";
import WorkNote from "./WorkNote";

import CustomTable from "../../Custom/CustomTable";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function TicketActivityLog({ ticket }) {
  const [value, setValue] = useState(0);

  if (!ticket) return null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 🔹 Demo Activity Log Data (image ke according)
  const activityLogs = [
    {
      id: 1,
      level: "L1 - GHD",
      action: "Closed",
      actionDate: "07 Nov 2025 3:00 AM",
      actedBy: "GHD_APP_USER (GHD_APP_USER)",
      log: "The ticket has been auto hard closed on 07/11/2025 03:00:41.",
      comments: "NA",
      assignedDate: "03 Nov 2025 6:26 PM",
    },
    {
      id: 2,
      level: "L1 - GHD",
      action: "Resolved",
      actionDate: "03 Nov 2025 6:53 PM",
      actedBy: "KUMAR REDDY KAPPETA (2270341)",
      log: "The ticket has been resolved by KUMAR REDDY KAPPETA (2270341) on 03/11/2025 18:53:23",
      comments:
        "Dear Associate, This is regarding the status of your ticket...",
      assignedDate: "03 Nov 2025 6:26 PM",
    },
  ];

  const columns = [
    {
      field: "level",
      headerName: "Level Name",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
    },
    {
      field: "actionDate",
      headerName: "Action Date",
      width: 150,
    },
    {
      field: "actedBy",
      headerName: "Acted By",
      width: 200,
    },
    {
      field: "log",
      headerName: "Activity Log",
      flex: 1,
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 200,
      renderCell: (params) => (
        <Typography color="primary">{params.value}</Typography>
      ),
    },
    {
      field: "assignedDate",
      headerName: "Assigned Date",
      width: 150,
    },
  ];

  return (
    <Box sx={{ mt: 1 }}>
      {/* 🔹 Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="activity log tabs"
        sx={{
          minHeight: 36,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            minHeight: 36,
          },
        }}
      >
        <Tab label="Work Note" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
        <Tab label="Activity Log" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <WorkNote notes={ticket.notes} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box mt={2}>
          <CustomTable
            rows={activityLogs}
            columns={columns}
            autoHeight
            rowHeight={52}
            sx={{
              "& .MuiDataGrid-footerContainer": {
                display: "none",
              },
            }}
          />
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

export default TicketActivityLog;
