import axios from 'axios';
import { HOST } from '@/utils/constants';

const apiRequest = axios.create({
  baseURL: HOST,
  withCredentials: true,
});

export default apiRequest;
