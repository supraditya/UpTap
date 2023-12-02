import { ADD_USER, LOAD_USERS } from './Reducer';
import { initializeApp, getApps } from 'firebase/app';
import { setDoc, doc, getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { firebaseConfig } from '../Secrets';

let snapshotUnsubsribe = undefined;

let app;
const apps = getApps();
if (apps.length == 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = apps[0];
}
const db = getFirestore(app);

const subscribeToUserUpdates = () => {
    if (snapshotUnsubsribe) {
        snapshotUnsubsribe();
    }

    return (dispatch) => {
        snapshotUnsubsribe = onSnapshot(collection(db, 'users'),

            usersSnapshot => {
                const updatedUsers = usersSnapshot.docs.map(uSnap => {
                    console.log(uSnap.data());
                    return uSnap.data(); // already has key?
                });
                dispatch({
                    type: LOAD_USERS,
                    payload: {
                        users: updatedUsers
                    }
                });
            });
    }
}

const addUser = (user) => {
    return async (dispatch) => {
        userToAdd = {
            displayName: user.displayName,
            email: user.email,
            key: user.uid
        };
        await setDoc(doc(db, 'users', user.uid), userToAdd);
        dispatch({
            type: ADD_USER,
            payload: {
                user: { ...userToAdd }
            }
        });
    }
}

export { addUser, subscribeToUserUpdates }