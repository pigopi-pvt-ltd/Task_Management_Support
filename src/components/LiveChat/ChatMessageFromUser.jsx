import { Avatar, Grid, Typography, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const ChatMessageFromUser = ({ message, sentAt }) => {
  const theme = useTheme();
  return (
    <Grid container m={1} mr={"auto"}>
      <Grid
        sx={{
          height: "fit-content",
        }}
        size={10}
        container
        spacing={1}
        id="to"
        mr={"auto"}
      >
        <Grid>
          <Avatar
            sx={{
              bgcolor: theme.palette.grey[700],
              height: "1.5em",
              width: "1.5em",
              fontSize: "1em",
            }}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
        </Grid>
        <Grid
          // flexGrow={1}
          sx={{
            bgcolor: theme.palette.grey[700],
            height: "fit-content",
            opacity: "90%",
            minWidth: "10em",
          }}
          p={1}
          borderRadius={"0.5rem"}
          // ml={"auto"}
          mr={"auto"}
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
      </Grid>
      <Typography mb={0} mr={"auto"} variant="caption">
        {sentAt}
      </Typography>
    </Grid>
  );
};

export default ChatMessageFromUser;
