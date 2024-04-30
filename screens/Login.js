import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Image, TouchableOpacity, Alert, KeyboardAvoidingView, SafeAreaView, Platform, ScrollView } from 'react-native';
import { logout, signIn, resetPassword } from '../components/Auth.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config.js';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../style/LoginStyle.js';


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
          console.log(auth.currentUser)
          setEmail('');
          setPassword('');
          navigation.navigate('DrawerNavigator');
        }
      });
    }
  };

  const handlePressLogout = () => {
    logout();
    navigation.navigate('Logout');
    };

  const handlePressResetPw = () => {
    if (!emailForgotPw) {
      Alert.alert('Email is required.');
    }
    else {
      resetPassword(emailForgotPw);
      setShowForgotPw(false);
    }
  };

  const handlePressForgotPw = () => {
    setShowForgotPw(!showForgotPw);
  };

  if (isLoggedIn) {
    return(
      <SafeAreaView style = {styles.container}>
        <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={{ flex: 1}}
            >
          <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <Image source={require('../images/logo/Logo_transparent.png')} style={styles.image} />
        <View style={styles.headerItem}>
          <Text style={styles.header}>Explore Oulu: Login</Text>
          <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
            <MaterialIcons name="logout" size={30} color="black" />
          </Pressable>
        </View>
        <Text style={styles.infoText}>
          You are logged in. Explore Oulu now!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('DrawerNavigator')} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>
          or go to your profile...
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Profile</Text>
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
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={{ flex: 1}}
            >
          <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <Image source={require('../images/logo/Logo_transparent.png')} style={styles.image} />
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
        <TouchableOpacity onPress={handlePressLogin} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressForgotPw}>
          <Text style={styles.linkText} >Forgot password?</Text>
        </TouchableOpacity>
       
        
       
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
            <TouchableOpacity onPress={() => handlePressResetPw()} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Reset password</Text>
            </TouchableOpacity> 
            <Text style={styles.passwordInfoText}>
              Be sure to check your spam folder after resetting!
            </Text>
          </>
        }
        
        </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Not having account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Sign up now!</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>

    );
  }
}