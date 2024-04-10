import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Image, TouchableOpacity, Alert, Button, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { logout, signIn, resetPassword } from '/Users/lucagail/Team17-ExploreOulu/components/Auth.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '/Users/lucagail/Team17-ExploreOulu/firebase/Config.js';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '/Users/lucagail/Team17-ExploreOulu/style/style.js';


export default function Login({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPw, setShowForgotPw] = useState(false);
  const [emailForgotPw, setEmailForgotPw] = useState('');
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handlePressLogin = () => {
    if (!email) {
      Alert.alert('Email is required.');
    }
    else if (!password) {
      Alert.alert('Password is required.');
    }
    else {
      signIn(email, password);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setEmail('');
          setPassword('');
          navigation.navigate('DrawerNavigator');
        }
      });
    }
  };

  const handlePressLogout = () => {
    logout();
  }

  const handlePressResetPw = () => {
    if (!emailForgotPw) {
      Alert.alert('Email is required.');
    }
    else {
      resetPassword(emailForgotPw);
      setShowForgotPw(false);
    }
  }

  const handlePressForgotPw = () => {
    setShowForgotPw(!showForgotPw);
  }

  if (isLoggedIn) {
    return(
      <SafeAreaView style = {styles.container}>
        <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Logo_transparent.png')} style={styles.image} />
        <View style={styles.headerItem}>
          <Text style={styles.header}>Explore Oulu: Login</Text>
          <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
        <Text style={styles.infoText}>
          You are logged in. Explore Oulu now!
        </Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Home"
            onPress={() => navigation.navigate('DrawerNavigator')}
            color="#D6C9B6" />
        </Pressable>
        <Text style={styles.infoText}>
          or go to your profile...
        </Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Profile"
            onPress={() => navigation.navigate('Profile')}
            color="#D6C9B6" />
        </Pressable>
        </SafeAreaView>    
        )
        
  }
  else { 
    return (
      <SafeAreaView style={styles.container}>
        <Image source={require('/Users/lucagail/Team17-ExploreOulu/assets/Logo_transparent.png')} style={styles.image} />
        <View style={styles.headerItem}>
          <Text style={styles.header}>Explore Oulu: Login</Text>
          </View>
        <Text style={styles.infoText}>Login to your account</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <Pressable style={styles.buttonStyle}>
          <Button 
            title="Login"
            onPress={handlePressLogin}
            color= '#D6C9B6'
           />
        </Pressable>
        <Pressable>
          <Text 
            style={styles.linkText}
            onPress={handlePressForgotPw}>Forgot password?</Text>
        </Pressable>
        <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Not having account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Sign up now!</Text>
        </TouchableOpacity>
      </View>
       
        { showForgotPw &&
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              value={emailForgotPw}
              onChangeText={(emailForgotPw) => setEmailForgotPw(emailForgotPw)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Pressable style={styles.buttonStyle}>
              <Button
                title="Reset password"
                onPress={() => handlePressResetPw()}
                color= '#D6C9B6'/>
            </Pressable>
            <Text style={styles.passwordInfoText}>
              Be sure to check your spam folder after resetting!
            </Text>
          </>
        }
      </SafeAreaView>

    );
  }
}