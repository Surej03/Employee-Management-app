import React, {createContext, useState} from 'react';
import axios from 'axios';

const UserContext = createContext();

export const Provider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}
export default UserContext;