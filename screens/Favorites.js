import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '/Users/lucagail/Team17-ExploreOulu/firebase/Config.js';

export default function Favorites() {
  
};
