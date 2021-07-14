import React, { useState, createContext } from 'react';
import { socket } from '../../Config/URL';

interface Auth {
    authName: string;
    employeeID: string;
    authIDs: number[];
    isAuthed: boolean;
}

interface AuthContextTypes extends Auth {
    login: (authName: string, employeeID: string, authIDs: number[]) => void;
    logout: () => void;
    // activeUsers: number;
}

export const AuthContext = createContext({
    login: () => {},
    logout: () => {},
    authName: '',
    employeeID: '',
    authIDs: [],
    isAuthed: false,
    // activeUsers: 0,
} as AuthContextTypes);

const AuthContextProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<Auth>({ authName: '', employeeID: '', authIDs: [], isAuthed: false });
    // const [activeUsers, setActiveUsers] = useState(0);

    // socket.on('UPDATE_USER_COUNT', (data: { data: number }) => {
    //     console.log('UPDATE_USER_COUNT', data);
    //     setActiveUsers(data.data);
    // });

    const loginHandler = (authName: string, employeeID: string, authIDs: number[]) => {
        setAuth({
            authName: authName,
            employeeID: employeeID,
            authIDs: authIDs,
            isAuthed: true,
        });
        console.log('logging in');
        // socket.emit('GET_USERS_COUNT');
    };

    const logoutHandler = () => {
        setAuth({
            authName: '',
            employeeID: '',
            authIDs: [],
            isAuthed: false,
        });
        socket.disconnect();
    };

    return (
        <AuthContext.Provider
            value={
                {
                    login: loginHandler,
                    logout: logoutHandler,
                    authName: auth.authName,
                    employeeID: auth.employeeID,
                    authIDs: auth.authIDs,
                    isAuthed: auth.isAuthed,
                    // activeUsers: activeUsers,
                } as AuthContextTypes
            }
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
