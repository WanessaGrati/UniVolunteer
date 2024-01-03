import {TextInput, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { MontserratFonts } from "../resorces/MontserratFonts";
import {buttonStyle, containerStyle, errorStyle, inputStyle, textStyle} from "../resorces/style";


const Login = ({navigation}) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DATABASE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorLog, setErrorLog] = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

    const showPasswordHandle = () => {
        setShowPassword(!showPassword);
    }

    const signIn = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setErrorLog(null);

            if (email === "univolunteer10@gmail.com") navigation.navigate('MeniuAdmin');
            else {
                const userDocRef = doc(db, "users", userCredential.user.uid);
                const userDoc = await getDoc(userDocRef);
                if (!userDoc.exists()) {
                    navigation.navigate('SchimbareParola');
                    await setDoc(userDocRef, { firstLogin: true});
                } else {
                    navigation.navigate('MeniuVoluntar');
                }

            }
        } catch (error) {
            setErrorLog("Email sau parolă incorectă!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={containerStyle.loginContainer}>

            <StatusBar translucent/>

            <View>
                <Text style={textStyle.uniVolunteerTextLogin}>UniVolunteer</Text>
            </View>

            <TextInput
                placeholderTextColor='#999999'
                placeholder='Email'
                style={[inputStyle.textInput, {width: '75%', marginTop: 40}]}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                secureTextEntry={!showPassword}
                placeholderTextColor='#999999'
                placeholder='Parola'
                style={[inputStyle.textInput, {width: '75%', marginTop: 20}]}
                onChangeText={(text)=> setPassword(text)}
                value={password}
            />

            <TouchableOpacity onPress={showPasswordHandle}>
                {
                    showPassword ?
                    <Text style={[errorStyle.errorText, {color: 'black', marginTop: 5}]}>Hide password</Text>
                        :
                    <Text style={[errorStyle.errorText, {color: 'black', marginTop: 5}]}>Show password</Text>
                }
            </TouchableOpacity>

            <TouchableOpacity style={[buttonStyle.button, {marginTop: 40}]} onPress={signIn}>
                <Text style={buttonStyle.buttonText}>Intră în cont</Text>
            </TouchableOpacity>

            {errorLog &&
                <View style={errorStyle.errorContainer}>
                    <Image style={errorStyle.errorImage} source={require("../images/errorMessage.png")}/>
                    <Text style={errorStyle.errorText}>Email sau parolă incorectă!</Text>
                </View>
            }
        </View>
    );
};

export default Login;