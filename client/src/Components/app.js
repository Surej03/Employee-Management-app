import React, { useState } from 'react'
import UserProfile from '../Homepage/SidebarComp/UserProfile'
import SignIn from './LoginSignUp/SignIn'

function app() {
    const [showProfile, setShowProfile] = useState(false);
    return <div className='app'>
        {showProfile ? <UserProfile /> : <SignIn />}
    </div>
}

export default app