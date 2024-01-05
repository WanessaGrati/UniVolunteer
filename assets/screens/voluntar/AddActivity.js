import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView, SafeAreaView
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {MontserratFonts} from "../../resorces/MontserratFonts";
import {buttonStyle, containerStyle, imageStyle, inputStyle, textStyle, errorStyle} from "../../resorces/style";
import verifyValidDate from '../../resorces/DateAndTime';
import {FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE} from "../../../firebase";
import {doc, setDoc, updateDoc, increment, getDoc} from "firebase/firestore";

const GenerateQRCode = ({navigation}) => {

    const auth = FIREBASE_AUTH;
    const database = FIREBASE_DATABASE;

    const [titlu, setTitlu] = useState('');
    const [errorTitlu, setErrorTitlu] = useState(false);

    const [date, setDate] = useState('');
    const [errorDate, setErrorDate] = useState(false);
    const [errorValidDate, setErrorValidDate] = useState(false);

    const [hours, setHours] = useState('');
    const [errorHours, setErrorHours] = useState(false);

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

    const verifyDate = () => {
        if (verifyValidDate(date)) {
            setErrorValidDate(false);
            return 1;
        }

        else {
            setErrorValidDate(true);
            return 0;
        }
    };

    const verifyEmptyTitlu = () => {
        if (titlu) {
            setErrorTitlu(false);
            return 1;
        }

        else {
            setErrorTitlu(true);
            return 0;
        }
    }

    const verifyEmptyDate = () => {
        if (date) {
            setErrorDate(false);
            return 1;
        }

        else {
            setErrorDate(true);
            return 0;
        }
    }

    const verifyEmptyHours = () => {
        if (hours) {
            setErrorHours(false);
            return 1;
        }

        else {
            setErrorHours(true);
            return 0;
        }
    }

    const goToBack = () => {
        navigation.goBack();
    };

    const handleButton = async () => {
        if (
            verifyEmptyTitlu() &
            verifyEmptyDate() &
            verifyEmptyHours() &
            verifyDate()
        ) {
            const user = auth.currentUser;

            const userDataActivities = await getDoc(doc(database, "activitati", user.uid));
            if (!userDataActivities.exists()) {
                setDoc(doc(database, "activitati", user.uid), {
                    totalActivities: 0
                }, {
                    merge: true
                }).then(()=>console.log("totalActivitati initializat"));
            }
            else {
                await updateDoc(doc(database, "activitati", user.uid), {
                    totalActivities: increment(1)
                });
            }

            const totalActivities = userDataActivities.data().totalActivities;

            const activities = {
                [`activity${totalActivities}`]: {
                    titlu,
                    date,
                    hours,
                    status: 'waiting'
                }
            };

            setDoc(doc(database, "activitati", user.uid), {
                activities
            }, {
                merge: true
            }).then(() => navigation.goBack());

        }
    }

    return (
        <SafeAreaView style={containerStyle.container}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
                enabled={false}
            >
                <StatusBar translucent/>

                <View style={[containerStyle.topReduced, {backgroundColor: "#DFFFD8"}]}>

                    <View style={containerStyle.topContainer}>
                        <TouchableOpacity onPress={goToBack}>
                            <Image style={imageStyle.imageBack} source={require("../../images/inapoi.png")}/>
                        </TouchableOpacity>

                        <Text style={textStyle.uniVolunteer}>UniVolunteer</Text>
                        <View style={{height: 45, width: 45}}></View>
                    </View>

                </View>


                <View style={containerStyle.middleExtended}>

                    <Text style={textStyle.head}>Adaugă</Text>
                    <Text style={textStyle.head}>activitate</Text>
                    <Text style={[textStyle.subHead, {fontSize: 12}]}>Câmpurile obligatorii sunt marcate cu *</Text>

                    <Text style={[textStyle.detail, {marginTop: 20}]}>Titlul activității:*</Text>
                    <TextInput
                        placeholder="Introduceți titlul activității"
                        style={[inputStyle.textInput, {marginTop: 5, width: '100%'}]}
                        placeholderTextColor='#999999'
                        value={titlu}
                        onChangeText={(text) => setTitlu(text)}
                    />

                    {
                        errorTitlu &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20, marginTop: 5}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Nu ați introdus titlul activității!</Text>
                        </View>
                    }

                    <Text style={[textStyle.detail, {marginTop: 20}]}>Data:*</Text>

                    <TextInput
                        placeholder="Introduceti în formatul: zz.ll.aaaa"
                        style={[inputStyle.textInput, {width: '100%'}]}
                        placeholderTextColor='#999999'
                        value={date}
                        onChangeText={(text) => setDate(text)}
                        keyboardType='numeric'
                    />

                    {
                        errorDate &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20, marginTop: 5}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Nu ați introdus data!</Text>
                        </View>
                    }

                    {
                        !errorDate && errorValidDate &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20, marginTop: 5}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Introduceți o dată validă!</Text>
                        </View>
                    }

                    <Text style={[textStyle.detail, {marginTop: 20}]}>Orele de voluntariat:*</Text>

                    <TextInput
                        placeholder="Introduceți orele"
                        style={[inputStyle.textInput, {width: '100%'}]}
                        placeholderTextColor='#999999'
                        keyboardType='numeric'
                        value={hours}
                        onChangeText={(text) => setHours(text)}
                    />

                    {
                        errorHours &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20, marginTop: 5}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Introduceți orele!</Text>
                        </View>
                    }
                </View>

                <View style={containerStyle.bottom}>
                    <TouchableOpacity style={buttonStyle.button} onPress={handleButton}>
                        <Text style={buttonStyle.buttonText}>Adaugă</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default GenerateQRCode;