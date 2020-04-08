import axios from 'axios';
import MsalHandler from './MsalHandler';

const ax = axios.create({
    baseURL: `http://jpda.ngrok.io/api/`, // just an echo api - returns headers -- will move to public API
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