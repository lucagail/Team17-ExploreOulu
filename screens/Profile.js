import { useState, useEffect } from 'react';
import { Text, View, Pressable, Button, TextInput, Alert, SafeAreaView } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, USERS_REF } from '../firebase/Config';
import { changePassword, logout, removeUser } from '../components/Auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '/Users/lucagail/Team17-ExploreOulu/style/style.js';


// deleting account einfügen (p.16)
export default function MyAccount({ navigation }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
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
      navigation.navigate('Login');
    };
  
    const handlePressChangePw = () => {
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
        changePassword(password, navigation);
      }
    };
  
  
    if (!isLoggedIn) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.headerItem}>
            <Text style={styles.header}>Explore Oulu: My Account</Text>
          </View>
          <Text style={styles.infoText}>Login to your account</Text>
          <Pressable style={styles.buttonStyle}>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')} 
              color= '#D6C9B6'/>
          </Pressable>
          <Text style={styles.infoText}>Not having account yet?</Text>
          <Pressable style={styles.buttonStyle}>
            <Button
              title="Register"
              onPress={() => navigation.navigate('Register')}
              color= '#D6C9B6' />
          </Pressable>
        </SafeAreaView>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.headerItem}>
            <Text style={styles.header}>Explore Oulu: My Account</Text>
            <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
              <MaterialIcons name="logout" size={24} color="black" />
            </Pressable>
          </View>
          <Text style={styles.myAccountSubheader}>Update account</Text>
          <Text style={styles.myAccountLabel}>Nickname</Text>
          <TextInput
            value={nickname}
            style={styles.myAccountTextInput}
            onChangeText={setNickname}
          />
          <Text style={styles.myAccountLabel}>Email</Text>
          <TextInput
            value={email}
            style={styles.myAccountTextInput}
            onChangeText={setEmail}
            />
          <View style={styles.buttonStyle}>
            <Button 
              title="Update"
              onPress={() => updateUserData()}
              color= '#D6C9B6'
            />
          </View>
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
          <View style={styles.buttonStyle}>
            <Button 
              title="Change password"
              onPress={handlePressChangePw}
              color= '#D6C9B6' />
          </View>
          
        </SafeAreaView>
      );
    }
  }