import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);
const gihtubProvider = new GithubAuthProvider();

export const GithubAuth = async () => {
    const user = await signInWithPopup(auth, gihtubProvider);
    const credential = GithubAuthProvider.credentialFromResult(user);
    return { user, credential };
};
