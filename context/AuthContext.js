"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    useEffect(() => {
        if (!router) return; // Ensure router is available
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/signin');
        }
        else{
            setIsLoggedIn(true);
            console.log(JSON.parse(user));
            setEmail(JSON.parse(user)?.user?.email);
        }
    }, [router]);

    return <AuthContext.Provider value={{ isLoggedIn, email,setEmail, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);