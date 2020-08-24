import axios from 'axios';
import {apiPort, env} from '../config/environment';

const api = axios.create({
  // When project is in production, the API url is the same as the window origin
  baseURL: env.development
    ? `http://localhost:${apiPort}`
    : window.location.origin,
});

export {api};
