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

    const loginHandler = (authName: string, employeeID: string, authIDs: number[]) => {
        setAuth({
            authName: authName,
            employeeID: employeeID,
            authIDs: authIDs,
            isAuthed: true,
        });
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
