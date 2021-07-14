import { io } from 'socket.io-client';
export const socket = io('http://localhost:5000/');

socket.on('connect', () => console.log('we is connected'));

export const backendURL = process.env.REACT_APP_BACKEND_URL as string;
