
// Save token in localStorage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Save branch data
export const setBranchData = (id, branchName, organizationName, contactNumber, address) => {
  const branchData = {
    id,
    branchName,
    organizationName,
    contactNumber,
    address,
  };
  localStorage.setItem("currentSelectedBranch", JSON.stringify(branchData));
};

// Get branch data
export const getBranchData = () => {
  const data = localStorage.getItem("currentSelectedBranch");
  return data ? JSON.parse(data) : null;
};

// Save current user data
export const setCurrentUserData = (data) => {
  localStorage.setItem("currentUserData", JSON.stringify(data));
};

// Get current user data
export const getCurrentUserData = () => {
  const data = localStorage.getItem("currentUserData");
  return data ? JSON.parse(data) : null;
};

// Remove current user data
export const removeCurrentUserData = () => {
  localStorage.removeItem("currentUserData");
};

// Save current project data
export const setCurrentProjectData = (data) => {
  localStorage.setItem("currentSelectedProjectData", JSON.stringify(data));
};

// Get current project data
export const getCurrentProjectData = () => {
  const data = localStorage.getItem("currentSelectedProjectData");
  return data ? JSON.parse(data) : null;
};

// Remove current project data
export const removeCurrentProjectData = () => {
  localStorage.removeItem("currentSelectedProjectData");
};

// Clear all auth-related data (optional helper)
export const clearAllAuthData = () => {
  removeToken();
  removeCurrentUserData();
  removeCurrentProjectData();
  localStorage.removeItem("currentSelectedBranch");
};
