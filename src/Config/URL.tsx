import { io } from 'socket.io-client';
export const backendURL = process.env.REACT_APP_BACKEND_URL as string;

export const socket = io(backendURL);

socket.on('connect', () => console.log('we is connected'));
