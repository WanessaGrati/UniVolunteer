import {
    KeyboardAvoidingView,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput, Alert
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useFonts} from "expo-font";
import React, {useState} from "react";
import { updatePassword } from 'firebase/auth';
import { FIREBASE_AUTH } from "../../../firebase";

const SetareParolaNoua = ({navigation}) => {
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const auth = FIREBASE_AUTH;

    const [fontsLoaded] = useFonts({
        "MontserratBold": require("../../fonts/Montserrat/Montserrat-Bold.ttf"),
        "MontserratLight": require("../../fonts/Montserrat/Montserrat-Light.ttf"),
        "MontserratRegular": require("../../fonts/Montserrat/Montserrat-Regular.ttf"),
        "MontserratMedium": require("../../fonts/Montserrat/Montserrat-Medium.ttf"),
    });

    if (!fontsLoaded) {
        return undefined;
    }

    const handleBack = () => {
        navigation.navigate("Login");
    };

    const handleButton = async () => {
        if (newPassword === repeatNewPassword) {
            setErrorMessage(null);
            try {
                const user = auth.currentUser;
                await updatePassword(user, newPassword);
                navigation.navigate("IntroducereDate");
            } catch (error) {
                Alert.alert("Eroare", "Parola nu a putut fi schimbată!");
            }
        }
        else setErrorMessage("Parolele nu coincid!");
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
                enabled={false}
            >
                <StatusBar translucent/>
                <View style = {styles.topBar}>
                    <View style={{width: '90%', height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={handleBack}>
                            <Image source={require("../../images/inapoi.png")} style={styles.image}/>
                        </TouchableOpacity>
                        <Text style={styles.uniVolunteer}>UniVolunteer</Text>
                        <View style={{height: 45, width: 45}}></View>
                    </View>
                </View>

                <View>
                    <Text style={[styles.headerText, styles.paddingTop20, styles.paddingLeft5]}>Schimbare</Text>
                    <Text style={[styles.headerText, styles.paddingLeft5, {paddingBottom: 20}]}>parolă</Text>
                    <Text style={styles.subHead}>Trebuie să schimbați parola</Text>
                    <TextInput
                        placeholder="Introduceți parola nouă"
                        style={[styles.textInput, {marginTop: 40}]}
                        placeholderTextColor='#000'
                        onChangeText={(text) => setNewPassword(text)}
                        value={newPassword}
                    />

                    <TextInput
                        placeholder="Repetați parola introdusă"
                        style={[styles.textInput, {marginTop: 20}]}
                        placeholderTextColor='#000'
                        onChangeText={(text) => setRepeatNewPassword(text)}
                        value={repeatNewPassword}
                    />
                </View>
                {
                    errorMessage &&
                    <View style={styles.error}>
                        <Image style={styles.errorImage} source={require("../../images/errorMessage.png")}/>
                        <Text style={styles.errorText}>Parolele nu coincid!</Text>
                    </View>
                }

                <View style={styles.bottomBox}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={handleButton}>Următorul</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: "white"
    },

    topBar: {
        backgroundColor: "#B4E4FF",
        width: "100%",
        height: '15%',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        paddingTop: 40,
        paddingLeft: '5%'
    },

    image: {
        height: 45,
        width: 45,
        justifyContent: 'flex-start'
    },

    uniVolunteer: {
        fontSize: 20,
        fontFamily: 'MontserratRegular',
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

    headerText: {
        fontFamily: 'MontserratBold',
        fontSize: 40
    },

    subHead: {
        fontFamily: "MontserratMedium",
        fontSize: 20,
        paddingLeft: '5%'
    },

    buttonText: {
        color: 'white',
        fontFamily: 'MontserratLight',
        fontSize: 18
    },

    button: {
        width: 200,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
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

    textInput: {
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        paddingLeft: 20,
        marginLeft: '5%'
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
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%'
    }
});

export default SetareParolaNoua;