// import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useAssignChat } from "../../services/mutations";

export default function DropDown({ defaultValue, items, chatId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuValue, setMenuValue] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setMenuValue(event.currentTarget.value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let token = localStorage.getItem("token");
  const { mutate, data, isError, error, reset, isPending } = useAssignChat();

  const handleItemClicked = (item) => {
    let assignChatData = {
      assignedTo: item.id,
      chatTicketId: chatId,
    };
    setMenuValue(item.value);
    mutate(assignChatData);
    console.log(assignChatData);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        // disabled={items.length == 0}
        onClick={handleClick}
        variant="contained"
        color="primary"
        size="small"
      >
        {menuValue.length > 0 ? menuValue : defaultValue}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {items.map((item) => {
          return (
            <MenuItem onClick={() => handleItemClicked(item)}>
              {item.value}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
