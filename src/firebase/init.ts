import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);
const gihtubProvider = new GithubAuthProvider(); // github authentication

export const GithubAuth = async () => {
    const userAuth = await signInWithPopup(auth, gihtubProvider);
    return userAuth;
};
