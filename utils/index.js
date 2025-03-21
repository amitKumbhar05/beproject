import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

// Load environment variables
dotenv.config({ path: '../.env.local' });

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Sign in with Google function
export const signInWithGoogle = async (token) => {
    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
};


