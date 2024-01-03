import React, {useState} from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import * as MailComposer from 'expo-mail-composer';
import {FIREBASE_AUTH} from "../../../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import generateRandomPassword from "./GenerateRandomPassword";
import {buttonStyle, containerStyle, errorStyle, imageStyle, inputStyle, textStyle} from "../../resorces/style";
import {MontserratFonts} from "../../resorces/MontserratFonts";

const AddVoluntar = ({navigation}) => {

    const auth = FIREBASE_AUTH;

    const [email, setEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

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
        <SafeAreaView style={containerStyle.container}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
                enabled={false}
            >
                <StatusBar translucent/>

                <View style={containerStyle.topReduced}>

                    <View style={containerStyle.topContainer}>

                        <TouchableOpacity onPress={goBack}>
                            <Image style={imageStyle.imageBack} source={require("../../images/inapoi.png")}/>
                        </TouchableOpacity>

                        <Text style={textStyle.uniVolunteer}>UniVolunteer</Text>
                        <View style={{height: 45, width: 45}}></View>

                    </View>

                </View>

                <View style={containerStyle.middleExtended}>

                    <Text style={textStyle.head}>Adăugare</Text>
                    <Text style={textStyle.head}>Voluntar</Text>

                    <TextInput
                        placeholder="Email"
                        style={[inputStyle.textInput, {marginTop: 40}]}
                        placeholderTextColor='#999999'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />

                    {
                        errorMessage &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Nu ați introdus emailul!</Text>
                        </View>
                    }

                    {
                        errorEmail &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Emailul introdus nu este valid!</Text>
                        </View>
                    }

                </View>

                <View style={containerStyle.bottom}>
                    <TouchableOpacity style={buttonStyle.button} onPress={handleCreateAccount}>
                        <Text style={buttonStyle.buttonText}>Creare cont</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AddVoluntar;