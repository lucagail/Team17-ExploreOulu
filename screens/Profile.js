import { useState, useEffect } from 'react';
import { Text, View, Pressable, Button, TextInput, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, USERS_REF } from '../firebase/Config.js';
import { changePassword, logout, removeUser } from '../components/Auth.js';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../style/ProfileStyle.js';

export default function MyAccount({ navigation }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmDelete, setConfirmDelete] = useState('');
  
    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setIsLoggedIn(true);
          (async () => {
            const docRef = doc(db, USERS_REF, auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setNickname(userData.nickname);
              setEmail(userData.email);
            }
            else {
              console.log("Error: No such document!");
            }
          })();
        }
        else {
          setIsLoggedIn(false);
        }
      });
    }, []);
    
    const updateUserData = async () => {
      const colRef = collection(db, USERS_REF);
      await updateDoc(doc(colRef, auth.currentUser.uid), {
        nickname: nickname
      })
      .then(() => {
        Alert.alert("Account updated.")
      })
      .catch((error) => {
        console.log("Update failed: " + error.message);
        Alert.alert("Update failed: " + error.message);
      })
    }
  
    const handlePressLogout = () => {
      logout();
      navigation.navigate('Logout');
    };
  
    const handlePressChangePw = async () => {
      if (!password) {
        Alert.alert('Password is required.');
      } else if (!confirmPassword) {
        setPassword('');
        Alert.alert('Confirming password is required.');
      } else if (password !== confirmPassword) {
        Alert.alert('Passwords do not match!');
      } else {
        setPassword('');
        setConfirmPassword('');
        try {
          await changePassword(password, navigation);
        } catch (error) {
          if (error.code === 'auth/requires-recent-login') {
            Alert.alert('You must log in again before changing your password.');
          } else {
            Alert.alert('Password change error: ' + error.message);
          }
        }
      }
    };    
  
    const handlePressDelete = () => {
      if (confirmDelete !== "DELETE") {
        Alert.alert('You must type DELETE to confirm.');
      }
      else {
        removeUser();
        setConfirmDelete('');
        logout();
        navigation.navigate('Login');
      }
    }
  
    if (!isLoggedIn) {
      return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
                style={{ flex: 1}}
                keyboardVerticalOffset={100}
            >
          <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
          <View style={styles.headerItem}>
            <Text style={styles.header}>Explore Oulu: My Account</Text>
          </View>
          <Text style={styles.infoText}>Login to your account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.infoText}>Not having account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
                style={{ flex: 1 }}
                keyboardVerticalOffset={100}
            >
              <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
          <View style={styles.headerItem}>
            <Text style={styles.header}>Explore Oulu: My Account</Text>
            <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
              <MaterialIcons name="logout" size={30} color="black" />
            </Pressable>
          </View>
          <Text style={styles.myAccountSubheader}>Update account</Text>
          <Text style={styles.myAccountLabel}>Nickname</Text>
          <TextInput
            value={nickname}
            style={styles.myAccountTextInput}
            onChangeText={setNickname}
          />
          <TouchableOpacity onPress={() => updateUserData()} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <Text style={styles.myAccountSubheader}>Change password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your new password*"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your new password*"
            value={confirmPassword}
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={handlePressChangePw} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Change password</Text>
          </TouchableOpacity>
          <Text style={styles.myAccountSubheader}>Delete account</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type DELETE here to confirm"
          value={confirmDelete}
          onChangeText={(confirmDelete) => setConfirmDelete(confirmDelete)}
          autoCapitalize="characters"
        />
         <TouchableOpacity onPress={() => handlePressDelete()} style={styles.buttonStyle}>
            <Text style={styles.deleteButtonText}>Delete account</Text>
          </TouchableOpacity>
        <Text style={styles.infoText}>
          Your data will be removed from the database!
        </Text>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  }