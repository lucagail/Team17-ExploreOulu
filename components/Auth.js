import { Alert } from 'react-native';
import {
  createUserWithEmailAndPassword, 
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword } from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc, getDocs } from 'firebase/firestore';
import { auth, db, USERS_REF } from '../firebase/Config.js';

export const signUp = async (nickname, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setDoc(doc(db, USERS_REF, userCredential.user.uid), {
        nickname: nickname,
        email: userCredential.user.email
      })
      console.log("Registration successful.");
    })
    .catch((error) => {
      console.log("Registration failed. ", error.message);
      Alert.alert("Registration failed. ", error.message);
    })
  }
  export const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Logged successful.");
    })
    .catch((error) => {
      console.log("Login failed. ", error.message);
      Alert.alert("Login failed. ", error.message);
    })
  }
  
  export const logout = async (email, password) => { 
    await signOut(auth, email, password)
    .then(() => {
      console.log("Logout successful.");
    })
    .catch((error) => {
      console.log("Login failed. ", error.message);
      Alert.alert("Login failed. ", error.message);
    })
}

export const updateEmailAddress = async (email) => {
  await updateEmail(auth.currentUser, email).
  then(() => {
    console.log("Email was updated successfully.");
  }).catch((error) => {
    console.log("Update of email failed. ", error.message);
    Alert.alert("Update of email failed. ", error.message);
  });
}

export const changePassword = async (password) => { 
  await updatePassword(auth.currentUser, password)
  .then(() => {
    console.log("Password changed successfully.");
    Alert.alert("Password changed successfully.");
  })
  .catch((error) => {
    console.log("Password change error. ", error.message);
    Alert.alert("Password change error. ", error.message);
  })
}

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("Password reset email has been sent.");
    Alert.alert("Password reset email has been sent.");
  })
  .catch((error) => {
    console.log("Password reset error. ", error.message);
    Alert.alert("Password reset error. ", error.message);
  })  
}

//neu

export const removeUser = async () => {
  try {
    console.log("Deleting user...");
    // Überprüfen, ob der Benutzer angemeldet ist
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
      console.log("User was removed.");

      console.log("Deleting hotels documents...");
      await deleteHotelsDocuments();
      console.log("Hotels documents deleted.");

      console.log("Deleting sightseeing documents...");
      await deleteSightseeingDocuments();
      console.log("Sightseeing documents deleted.");

      console.log("Deleting restaurants documents...");
      await deleteRestaurantsDocuments();
      console.log("Restaurants documents deleted.");

      console.log("Deleting user document...");
      await deleteUserDocument();
      console.log("User document deleted.");

    } else {
      console.log("No user logged in.");
      Alert.alert("No user logged in.");
    }
  } catch (error) {
    console.log("Error removing user:", error.message);
    Alert.alert("User delete error:", error.message);
  }
};



const deleteHotelsDocuments = async () => {
  if (auth.currentUser) {
    try {
      console.log("Deleting hotels documents...");
      const subColRef = collection(db, USERS_REF, auth.currentUser.uid, 'hotels');
      const querySnapshot = await getDocs(subColRef);
      querySnapshot.forEach(doc => {
        deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error deleting hotels documents:", error.message);
    }
  }
};

const deleteSightseeingDocuments = async () => {
  if (auth.currentUser) {
    try {
      console.log("Deleting sightseeing documents...");
      const subColRef = collection(db, USERS_REF, auth.currentUser.uid, 'sightseeing');
      const querySnapshot = await getDocs(subColRef);
      querySnapshot.forEach(doc => {
        deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error deleting sightseeing documents:", error.message);
    }
  }
};

const deleteRestaurantsDocuments = async () => {
  if (auth.currentUser) {
    try {
      console.log("Deleting restaurants documents...");
      const subColRef = collection(db, USERS_REF, auth.currentUser.uid, 'restaurants');
      const querySnapshot = await getDocs(subColRef);
      querySnapshot.forEach(doc => {
        deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error deleting restaurants documents:", error.message);
    }
  }
};


const deleteUserDocument = async () => {
  console.log("Deleting user document...");
  if (auth.currentUser) {
    await deleteDoc(doc(db, USERS_REF, auth.currentUser.uid))
      .then(() => {
        console.log("User document was removed.");
      }).catch((error) => {
        console.log("User document delete error. ", error.message);
        Alert.alert("User document delete error. ", error.message);
      });
  } else {
    console.log("No user logged in.");
    Alert.alert("Account deleted.");
  }
};