import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: 'AIzaSyB70Zd60xPSVOYCye-kD_x_crCxQlpELNo',
  authDomain: 'instagram-clone-f0b00.firebaseapp.com',
  databaseURL: 'https://instagram-clone-f0b00-default-rtdb.firebaseio.com',
  projectId: 'instagram-clone-f0b00',
  storageBucket: 'instagram-clone-f0b00.appspot.com',
  messagingSenderId: '133748775746',
  appId: '1:133748775746:web:3a1159bed9d40c5d3106db',
  measurementId: 'G-YNYR7C2H5T',
});

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState({ status: 'loading' });

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims['https://hasura.io/jwt/claims'];

        if (hasuraClaim) {
          setAuthState({ status: 'in', user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref(`metadata/'${user.uid}/refreshTime`);

          metadataRef.on('value', async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: 'in', user, token });
          });
        }
      } else {
        setAuthState({ status: 'out' });
      }
    });
  }, []);

  async function signInWithGoogle() {
    await firebase.auth().signInWithPopup(provider);
  }

  async function signOut() {
    setAuthState({ status: 'loading' });
    await firebase.auth().signOut();
    setAuthState({ status: 'out' });
  }

  if (authState.status === 'loading') {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          signInWithGoogle,
          signOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
