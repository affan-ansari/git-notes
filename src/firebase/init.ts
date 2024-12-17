import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);
const gihtubProvider = new GithubAuthProvider();
gihtubProvider.addScope('gist');

export const GithubAuth = async () => {
    const user = await signInWithPopup(auth, gihtubProvider);
    const credential = GithubAuthProvider.credentialFromResult(user);
    return { user, credential };
};

export const GithubSignout = async () => {
    return signOut(auth);
};
