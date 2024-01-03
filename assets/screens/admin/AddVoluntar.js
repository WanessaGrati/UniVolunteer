import React, {useState} from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useFonts} from "expo-font";
import * as MailComposer from 'expo-mail-composer';
import {FIREBASE_AUTH} from "../../../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import generateRandomPassword from "./GenerateRandomPassword";

const AddVoluntar = ({navigation}) => {

    const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const auth = FIREBASE_AUTH;
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    const [fontsLoaded] = useFonts({
        "MontserratMedium": require("../../fonts/Montserrat/Montserrat-Medium.ttf"),
        "MontserratBold": require("../../fonts/Montserrat/Montserrat-Bold.ttf"),
        "MontserratLight": require("../../fonts/Montserrat/Montserrat-Light.ttf"),
        "MontserratRegular": require("../../fonts/Montserrat/Montserrat-Regular.ttf")
    });

    if (!fontsLoaded) {
        return undefined;
    }

    const handleCreateAccount = async () => {
        if (email) {
            if (validEmail(email)) {
                setErrorMessage(false);
                setErrorEmail(false);
                const generatedPassword = generatePassword();
                if (generatedPassword === null) {
                    alert("Eroare la generare de parola!");
                    return;
                }
                try {
                    const response = await createUserWithEmailAndPassword(auth, email, generatedPassword);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
                sendCredentials(email, generatedPassword);
                console.log("Parola: " + generatedPassword);
            }
            else {
                setErrorMessage(false);
                setErrorEmail(true);
            }
        }
        else {
            setErrorEmail(false);
            setErrorMessage(true);
        }
    };

    const validEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const generatePassword = () => {
        return generateRandomPassword();
        //return "parola";
    };

    const sendCredentials = (email, password) => {
        const subject = 'Date de Autentificare';
        const body = `Adresă de Email: ${email}\nParolă: ${password}`;

        const recipients = [email];
        const attachments = [];

        MailComposer.composeAsync({
            recipients,
            subject,
            body,
            attachments,
        })
            .then((result) => {
                if (result.status === 'sent') {
                } else {
                    Alert.alert('Eroare', 'Email-ul nu a putut fi deschis.');
                }
            })
            .catch((error) => {
                console.error('Eroare la deschiderea email-ului', error);
            });
    };

    const goBack = () => {
        navigation.navigate("MeniuAdmin");
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
                enabled={false}
            >
                <StatusBar translucent/>
                <View style={styles.topBar}>
                    <View style={{width: '90%', height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={goBack}>
                            <Image source={require("../../images/inapoi.png")} style={styles.image}/>
                        </TouchableOpacity>
                        <Text style={styles.uniVolunteer}>UniVolunteer</Text>
                        <View style={{height: 45, width: 45}}></View>
                    </View>
                </View>
                <View>
                    <Text style={[styles.salutText, styles.paddingTop20, styles.paddingLeft5]}>Adăugare</Text>
                    <Text style={[styles.salutText, styles.paddingLeft5, {paddingBottom: 20}]}>Voluntar</Text>
                    <Text></Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.textInput}
                        placeholderTextColor='#999999'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    {
                        errorMessage &&
                        <View style={styles.error}>
                            <Image style={styles.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={styles.errorText}>Nu ați introdus emailul!</Text>
                        </View>
                    }

                    {
                        errorEmail &&
                        <View style={styles.error}>
                            <Image style={styles.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={styles.errorText}>Emailul introdus nu este valid!</Text>
                        </View>
                    }

                </View>


                <View style={styles.bottomBox}>
                    <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                        <Text style={styles.buttonText}>Creare cont</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    image: {
        height: 45,
        width: 45,
        justifyContent: 'flex-start'
    },

    uniVolunteer: {
        fontSize: 20,
        fontFamily: 'MontserratRegular',
        //flex: 1,
    },

    topBar: {
        backgroundColor: '#F7C8E0',
        width: '100%',
        height: '15%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingTop: 40,
        paddingLeft: '5%',
    },

    paddingTop40: {
        paddingTop: 40
    },

    paddingTop20: {
        paddingTop: 20
    },

    paddingLeft5: {
        paddingLeft: '5%'
    },

    salutText: {
        fontFamily: 'MontserratBold',
        fontSize: 40
    },

    textInput: {
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        paddingLeft: 20,
        marginLeft: '5%'
    },

    button: {
        width: 200,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'MontserratLight',
        fontSize: 18
    },

    bottomBox: {
        backgroundColor: 'white',
        width: '100%',
        height: '10%',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
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
    },

    error: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10%'
    },
});
export default AddVoluntar;