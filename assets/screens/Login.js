import {TextInput, StyleSheet, Text, View, Button, TouchableOpacity, Alert, Image } from "react-native";
import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";
import {useFonts} from "expo-font";
import { signInWithEmailAndPassword } from "firebase/auth";
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";


const Login = ({navigation}) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DATABASE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorLog, setErrorLog] = useState(null);

    const [fontsLoaded] = useFonts({
        "MontserratBold": require("../fonts/Montserrat/Montserrat-Bold.ttf"),
        "MontserratLight": require("../fonts/Montserrat/Montserrat-Light.ttf"),
        "MontserratRegular": require("../fonts/Montserrat/Montserrat-Regular.ttf"),
    })

    if (!fontsLoaded) {
        return undefined;
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
        <View style={styles.container}>
            <StatusBar translucent/>
            <View>
                <Text style={styles.uniVolunteerText}>UniVolunteer</Text>
            </View>
            <View style={{paddingTop: 40}}>
                <TextInput
                    placeholderTextColor='#999999'
                    placeholder='Email'
                    style={styles.textInput}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput
                    //secureTextEntry={true}
                    placeholderTextColor='#999999'
                    placeholder='Parola'
                    style={[styles.textInput, {marginTop: 20}]}
                    onChangeText={(text)=> setPassword(text)}
                    value={password}
                />
            </View>
            <View style={{marginTop: 40}}>
                <TouchableOpacity style={styles.button} onPress={signIn}>
                    <Text style={styles.buttonText}>Intră în cont</Text>
                </TouchableOpacity>
            </View>

            {errorLog &&
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={styles.errorImage} source={require("../images/errorMessage.png")}/>
                    <Text style={styles.errorText}>Email sau parolă incorectă!</Text>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    uniVolunteerText: {
        color: 'black',
        fontFamily: 'MontserratBold',
        fontSize: 25
    },

    textInput: {
        width: 250,
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        paddingLeft: 20
    },

    button: {
        width: 200,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: 'white',
        fontFamily: 'MontserratLight',
        fontSize: 18
    },

    errorImage: {
        width: 20,
        height: 20
    },

    errorText: {
        fontSize: 12,
        fontFamily: "MontserratRegular",
        color: 'red',
        marginLeft: 5
    }
})

export default Login;