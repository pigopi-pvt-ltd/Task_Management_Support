// import { config } from "@/config";
// import { openSnackbar } from "@/redux/slices/snackbar";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { config } from "../../config";
import DataTable from "../components/DataTable/DataTable";
import { Button } from "@mui/material";
import DropDown from "../components/DataTable/DropDown";
import {
  useGetAllSupportEmployees,
  useGetAllTickets,
} from "../services/queries";
import { useDispatch } from "react-redux";
import { setLoader } from "../store/slices/loaderSlice";

const ChatTicketManagement = () => {
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useGetAllTickets(token, page);

  const {
    data: employee,
    isError: emplErroor,
    isLoading: employeeLoading,
    error: emperr,
  } = useGetAllSupportEmployees(token);

  dispatch(
    setLoader({
      loading: isLoading,
    })
  );
  dispatch(
    setLoader({
      loading: employeeLoading,
    })
  );
  //   const dispatch = useDispatch;
  if (isError) {
    // dispatch(
    //   openSnackbar({
    //     message: error.message || "Error while getting tickets",
    //     severity: "error",
    //   })
    // );
    alert("error");
  }
  // const [rows, setRows] = useState([]);
  if (data) {
    console.log("data---", data);
  }
  if (emplErroor) {
    console.log("error in employee--", emperr);
  }
  // useEffect(() => {
  //   if (data && employee) {
  //     console.log("data---", data);
  //     let rows = data.chatTickets.map((ct) => {
  //       return {
  //         ...ct,
  //         issue: ct.ticketType.replaceAll("_", " "),
  //         isAssigned: ct.isAssigned ? "Agent Name" : "Unassigned",
  //       };
  //     });
  //     setRows(rows);
  //     console.log(employee);
  //   }
  // }, [isLoading, employeeLoading]);
  let items = [];
  if (employee) {
    console.log(employee);
    items = employee.supportEmployees.map((emp) => {
      return {
        ...emp,
        value: emp.username,
      };
    });
  }
  let rows = [];
  if (data) {
    rows = data.chatTickets.map((ct) => {
      return {
        ...ct,
        issue: ct.ticketType.replaceAll("_", " "),
        isAssigned: ct.isAssigned ? ct.assignedTo.username : "Unassigned",
      };
    });
  }
  const ChatColumns = [
    { field: "issue", headerName: "Issue" },
    { field: "organizationName", headerName: "Organization Name" },
    { field: "branchName", headerName: "Branch Name" },
    { field: "createdByName", headerName: "User" },
    {
      field: "isAssigned",
      headerName: "Assigned To",
      sortable: false,
      renderCell: (params) => (
        <DropDown
          items={items}
          chatId={params.id}
          // rows={rows}
          defaultValue={params.value}
        />
      ),
    },
    { field: "status", headerName: "Status", sortable: false },
    { field: "updatedAt", headerName: "Last Updated", sortable: false },
  ];

  return (
    <>{employee && data && <DataTable cols={ChatColumns} rows={rows} />}</>
  );
};
export default ChatTicketManagement;
