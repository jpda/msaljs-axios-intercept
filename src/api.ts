import axios from 'axios';
import MsalHandler from './MsalHandler';

const ax = axios.create({
    baseURL: `http://jpda.ngrok.io/api/`,
});

const msalHandler = new MsalHandler();

ax.interceptors.request.use(
    async request => {
        var token = await msalHandler.acquireAccessToken();
        request.headers["Authorization"] = "Bearer " + token;
        return request;
    }
)

export default ax;