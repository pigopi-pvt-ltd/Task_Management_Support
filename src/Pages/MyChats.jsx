import { useState } from "react";
import { useGetallAssignedChatTickets } from "../services/queries";
import DenseTable from "../components/DenseTable/DenseTable";
import { Grid } from "@mui/material";

const MyChats = () => {
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const { data, isError, error, isLoading } = useGetallAssignedChatTickets(
    token,
    page
  );

  const ChatColumns = [
    // {
    //   id: "issue",
    //   label: "Issue",
    //   numeric: false,
    //   disablePadding: true,
    // },
    {
      id: "organizationName",
      label: "Organization Name",
      numeric: false,
    },
    {
      id: "branchName",
      label: "Branch Name",
      numeric: false,
    },
    {
      id: "createdByName",
      label: "User",
      numeric: false,
    },

    {
      id: "status",
      label: "Status",
      numeric: false,
    },
    {
      id: "chatRoom",
      label: "Chat Room",
      numeric: false,
    },
    {
      id: "updatedAt",
      label: "Last Updated",
      numeric: false,
    },
  ];

  let rows = [];
  let id = 0;
  if (isError) {
    console.log("error while getting my chats---", error);
  }
  if (data) {
    console.log("my chats---,", data);

    data.chatTickets.forEach((ct) => {
      let obj = {
        id: id,
      };
      ChatColumns.forEach((field) => {
        obj[field.id] = ct[field.id];
      });
      obj.id++;
      //   obj = {
      //     ...obj,
      //     ...ct,
      //   };
      //   delete obj.assignedTo;
      rows.push(obj);
    });
    console.log("rows", rows);
  }

  return (
    <>
      {data && (
        <Grid
          container
          sx={{
            overflowX: "auto",
            // minHeight: "100vh",
            height: "80vh",
          }}
        >
          <DenseTable
            tableTitle="My Chats"
            headCells={ChatColumns}
            rows={rows}
            // fetchedTickets={data.chatTickets}
          />
        </Grid>
      )}
    </>
  );
};

export default MyChats;
