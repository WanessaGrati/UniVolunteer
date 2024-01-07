import {
    KeyboardAvoidingView,
    Image,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    TextInput, Alert
} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import { updatePassword } from 'firebase/auth';
import { FIREBASE_AUTH } from "../../../firebase";
import {buttonStyle, containerStyle, errorStyle, imageStyle, inputStyle, textStyle} from "../../resorces/style";
import {MontserratFonts} from "../../resorces/MontserratFonts";
import {verifyPassword} from "../admin/GenerateRandomPassword";

const SetareParolaNoua = ({navigation}) => {

    const auth = FIREBASE_AUTH;

    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState(false);
    const [errorPassword, setErrorPassword] = useState (false);

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

    const goBack = () => {
        navigation.navigate("Login");
    };

    const handleButton = async () => {
        if (verifyPassword(newPassword)) {
            setErrorPassword(false);
            if (newPassword === repeatNewPassword) {
                setErrorMessage(false);
                try {
                    const user = auth.currentUser;
                    await updatePassword(user, newPassword);
                    navigation.navigate("IntroducereDate");
                } catch (error) {
                    Alert.alert("Eroare", "Parola nu a putut fi schimbată!");
                }
            } else setErrorMessage(true);
        } else setErrorPassword(true);
    }

    return (
        <SafeAreaView style={containerStyle.container}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
                enabled={false}
            >
                <StatusBar translucent/>

                <View style={[containerStyle.topReduced, {backgroundColor: '#B4E4FF'}]}>

                    <View style={containerStyle.topContainer}>

                        <TouchableOpacity onPress={goBack}>
                            <Image style={imageStyle.imageBack} source={require("../../images/inapoi.png")}/>
                        </TouchableOpacity>

                        <Text style={textStyle.uniVolunteer}>UniVolunteer</Text>
                        <View style={{height: 45, width: 45}}></View>

                    </View>

                </View>

                <View style={containerStyle.middleExtended}>

                    <Text style={textStyle.head}>Schimbare</Text>
                    <Text style={textStyle.head}>parolă</Text>
                    <Text style={textStyle.subHead}>Trebuie să schimbați parola</Text>

                    <TextInput
                        secureTextEntry={true}
                        placeholder="Introduceți parola nouă"
                        style={[inputStyle.textInput, {marginTop: 40}]}
                        placeholderTextColor='#999999'
                        onChangeText={(text) => setNewPassword(text)}
                        value={newPassword}
                    />

                    <TextInput
                        secureTextEntry={true}
                        placeholder="Repetați parola introdusă"
                        style={[inputStyle.textInput, {marginTop: 20}]}
                        placeholderTextColor='#999999'
                        onChangeText={(text) => setRepeatNewPassword(text)}
                        value={repeatNewPassword}
                    />

                    {
                        errorMessage &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Parolele nu coincid!</Text>
                        </View>
                    }

                    {
                        errorPassword &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Parola trebuie să conțină minim 8 caractere, minim o literă și minim o cifră!</Text>
                        </View>
                    }
                </View>

                <View style={containerStyle.bottom}>
                    <TouchableOpacity style={buttonStyle.button} onPress={handleButton}>
                        <Text style={buttonStyle.buttonText} >Următorul</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SetareParolaNoua;