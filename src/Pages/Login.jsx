import { extendTheme, CssVarsProvider, FormLabel, Alert } from "@mui/joy";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { Typography, CircularProgress } from "@mui/material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setCurrentUserData, setToken, setBranchData } from "../utils/auth";
import axiosInstance from "../utils/axiosInstance";
import LoginImage2 from "../assets/loginpage2.png";
import logo from "../assets/PigoPi.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("Support_Admin");
  const [password, setPassword] = useState("Support_Admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const joyTheme = extendTheme();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setError("");

    let hasError = false;

    if (!username.trim()) {
      setUsernameError("Username is required");
      hasError = true;
    }
    if (!password.trim()) {
      // setPasswordError("Password is required");
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const res = await axiosInstance.post(`/supportUsers/login`, {
        username: username,
        password: password,
      });

      if (res.status === 200) {
        if (res.data && res.data.token) {
          setToken(res.data.token);
          setCurrentUserData(res.data.data);
        }

        const role = res.data.data.role;
        console.log("User role:", role);

        if (role === "Support_Admin") {
          window.location.href = "/users";
        } else {
          // employee or other roles
          const id = res.data.data.branchId;
          const branchName = res.data.data.branchName;
          const organizationName = res.data.data.organizationName;
          setBranchData(id, branchName, organizationName);
          window.location.href = "/users";
        }
      } else {
        // fallback message if status isn't 200
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      const msg =
        err?.response?.data?.message || "Invalid username or password";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: `url('${LoginImage2}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "32%" },
          background: "white",
          display: "flex",
          boxShadow: 3,
          borderRadius: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "70%",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            py: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: -2,
            }}
          >
            <img src={logo} height={70} />
          </Box>

          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "24px",
                color: "black",
                fontWeight: "bold",
                mt: -1,
              }}
            >
              Welcome to the PigoPi
            </Typography>
          </Box>
          <CssVarsProvider theme={joyTheme}>
            <form
              onSubmit={handleLogin}
              style={{
                width: "full",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "8px",
              }}
            >
              <Box>
                <FormLabel
                  htmlFor="username"
                  required
                  sx={{
                    fontSize: "14px",
                    color: "#616161",
                    mb: 1,

                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                >
                  Username
                </FormLabel>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  size="sm"
                  sx={{
                    "--Input-focusedThickness": "0rem",
                    outline: "none",
                    boxShadow: 2,
                    background: "transparent",
                    fontSize: "14px",
                    color: "#212121",
                    py: "10px",
                    pl: "20px",
                  }}
                />
                {usernameError && (
                  <Typography sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>
                    {usernameError}
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormLabel
                  htmlFor="password"
                  required
                  sx={{
                    fontSize: "14px",
                    color: "#616161",
                    mb: 1,

                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                >
                  Password
                </FormLabel>
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  endDecorator={
                    showPassword ? (
                      <Tooltip title="Hide password">
                        <VisibilityOffIcon
                          sx={{ cursor: "pointer" }}
                          onClick={handleShowPassword}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Show password">
                        <VisibilityIcon
                          sx={{ cursor: "pointer" }}
                          onClick={handleShowPassword}
                        />
                      </Tooltip>
                    )
                  }
                  placeholder="Enter your password"
                  size="sm"
                  sx={{
                    "--Input-focusedThickness": "0rem",
                    outline: "none",
                    boxShadow: 2,
                    background: "transparent",
                    fontSize: "14px",
                    color: "#212121",
                    py: "10px",
                    pl: "20px",
                  }}
                />

                {passwordError && (
                  <Typography sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>
                    {passwordError}
                  </Typography>
                )}
              </Box>

              {error && (
                <Alert color="danger" variant="soft" size="sm">
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                disabled={loading}
                endDecorator={
                  loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <KeyboardArrowRight sx={{ color: "white" }} />
                  )
                }
                sx={{
                  background: "#00005B",
                  marginTop: "8px",
                  "&:hover": {
                    background: "#00007B",
                    opacity: 0.9,
                  },
                }}
              >
                {" "}
                Login
              </Button>
            </form>
          </CssVarsProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
