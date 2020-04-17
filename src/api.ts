import axios from 'axios';
import MsalHandler from './msal/MsalHandler';

const ax = axios.create({
    baseURL: `https://saywhat.azurewebsites.net/api/`, // just an echo api - returns headers and query
});

const msalHandler = MsalHandler.getInstance();

ax.interceptors.request.use(
    async request => {
        console.debug("api::interceptor: request.url: " + request.url);
        var token = await msalHandler.acquireAccessToken(request.url);
        request.headers["Authorization"] = "Bearer " + token;
        return request;
    }
)

export default ax;