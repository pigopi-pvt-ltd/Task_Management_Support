const API_PROD_URL = import.meta.env.VITE_APP_API_PROD_URL;
const IMAGE_PROD_URL = import.meta.env.VITE_APP_IMAGE_PROD_URL;
const API_DEV_URL = import.meta.env.VITE_APP_API_DEV_URL;
const IMAGE_DEV_URL = import.meta.env.VITE_APP_IMAGE_DEV_URL;
const host_DEV = import.meta.env.VITE_HOST_DEV;
const host_prod = import.meta.env.VITE_HOST_PROD;
const port = import.meta.env.VITE_PORT;
console.log("host-dev", host_DEV);
const dev = {
  apiBaseUrl: API_DEV_URL,
  imageBaseUrl: IMAGE_DEV_URL,
  host: host_DEV,
  port: port,
  dataGrid: {
    defaultPageSize: 200,
    pageSizeOptions: [200, 500, 1000],
  },
};

const prod = {
  apiBaseUrl: API_PROD_URL,
  imageBaseUrl: IMAGE_PROD_URL,
  host: host_prod,
  port: port,
  dataGrid: {
    defaultPageSize: 50,
    pageSizeOptions: [25, 50, 100],
  },
};

export const config =
  import.meta.env.VITE_APP_ENV === "development" ? dev : prod;
