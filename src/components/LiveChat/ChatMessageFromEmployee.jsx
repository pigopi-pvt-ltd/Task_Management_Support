import { Avatar, Grid, Typography, useTheme } from "@mui/material";
import logo from "../../assets/PigoPi.png";

const ChatMessageFromEmployee = ({ message, sentAt }) => {
  const theme = useTheme();
  return (
    <Grid container m={1} ml={"auto"}>
      <Grid
        sx={{
          height: "fit-content",
        }}
        size={10}
        container
        spacing={1}
        id="to"
        ml={"auto"}
      >
        <Grid
          sx={{
            bgcolor: theme.palette.primary.light,
            opacity: "85%",
            height: "fit-content",
            minWidth: "10em",
          }}
          p={1}
          borderRadius={"0.5rem"}
          // ml={"auto"}
          ml={"auto"}
        >
          <Grid>
            <Typography
              sx={{
                color: theme.palette.grey[200],
                fontWeight: "medium",
                lineHeight: "1.3em",
              }}
              variant="subtitle2"
              textAlign={"left"}
            >
              {message}
            </Typography>
          </Grid>
        </Grid>
        <Avatar
          // sx={{
          //   bgcolor: theme.palette.primary.light,
          //   height: "1.5em",
          //   width: "1.5em",
          //   fontSize: "1em",
          // }}
          src={logo}
        >
          {/* <PersonIcon fontSize="small" /> */}
        </Avatar>
      </Grid>
      <Typography mb={0} ml={"auto"} variant="caption">
        {sentAt}
      </Typography>
    </Grid>
  );
};

export default ChatMessageFromEmployee;
