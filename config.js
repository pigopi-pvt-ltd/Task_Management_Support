const API_PROD_URL = import.meta.env.VITE_APP_API_PROD_URL;
const IMAGE_PROD_URL = import.meta.env.VITE_APP_IMAGE_PROD_URL;
const API_DEV_URL = import.meta.env.VITE_APP_API_DEV_URL;
const IMAGE_DEV_URL = import.meta.env.VITE_APP_IMAGE_DEV_URL;

const dev = {
  apiBaseUrl: API_DEV_URL,
  imageBaseUrl: IMAGE_DEV_URL,

  dataGrid: {
    defaultPageSize: 200,
    pageSizeOptions: [200, 500, 1000],
  },

};

const prod = {
  apiBaseUrl: API_PROD_URL,
  imageBaseUrl: IMAGE_PROD_URL,

  dataGrid: {
    defaultPageSize: 50,
    pageSizeOptions: [25, 50, 100],
  },


};

export const config = import.meta.env.VITE_APP_ENV === "development" ? dev : prod;
