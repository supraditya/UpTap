import {
    getAuth, signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile, signOut as fbSignOut,
    initializeAuth,
    getReactNativePersistence,
    onAuthStateChanged
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import app from './firebase'

try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
} catch (error) {
    auth = getAuth(app); // if auth already initialized
}

const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
}

const signOut = async () => {
    await fbSignOut(auth);
}

const getAuthUser = () => {
    return auth.currentUser;
}

const signUp = async (displayName, email, password) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: displayName });
    return userCred.user;
}

let unsubscribeFromAuthChanges = undefined;

const subscribeToAuthChanges = (navigation) => {

    if (unsubscribeFromAuthChanges) {
        unsubscribeFromAuthChanges();
    }

    unsubscribeFromAuthChanges = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User sign in successful
            navigation.navigate('Home');
        } else {
            // User sign out successful
            navigation.navigate('Login');
        }
    })
}

export { signIn, signOut, signUp, getAuthUser, subscribeToAuthChanges }