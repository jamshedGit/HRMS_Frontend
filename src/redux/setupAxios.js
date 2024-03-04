export default function setupAxios(axios, store) {
  // setTimeout(() => {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { tokens },
      } = store.getState();

      if (tokens) {
       
        config.headers.Authorization = `Bearer ${tokens?.access}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );
  // }, 10000)
}
