import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    TextInput, Animated, ScrollView
} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {doc, setDoc} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebase";
import {buttonStyle, containerStyle, errorStyle, inputStyle, textStyle} from "../../resorces/style";
import {MontserratFonts} from "../../resorces/MontserratFonts";

const IntroduceDate = ({navigation}) => {

    const auth = FIREBASE_AUTH;

    const [nume, setNume] = useState('');
    const [errorNume, setErrorNume] = useState(false);

    const [prenume, setPrenume] = useState('');
    const [errorPrenume, setErrorPrenume] = useState(false);

    const [universitate, setUniversitate] = useState('');
    const [errorUniversitate, setErrorUniversitate] = useState(false);

    const [facultate, setFacultate] = useState('');
    const [errorFacultate, setErrorFacultate] = useState(false);

    const [an, setAn] = useState('');
    const [errorAn, setErrorAn] = useState(false);

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

    const scroll = new Animated.Value(0);

    const verifyNume = () => {
        if (nume) {
            setErrorNume(false);
            return 1;
        }
        else {
            setErrorNume(true);
            return 0;
        }
    };

    const verifyPrenume = () => {
        if (prenume) {
            setErrorPrenume(false);
            return 1;
        }
        else {
            setErrorPrenume(true);
            return 0;
        }
    };

    const verifyUniversitate = () => {
        if (universitate) {
            setErrorUniversitate(false);
            return 1;
        }
        else {
            setErrorUniversitate(true);
            return 0;
        }
    };

    const verifyFacultate = () => {
        if (facultate) {
            setErrorFacultate(false);
            return 1;
        }
        else {
            setErrorFacultate(true);
            return 0;
        }
    };

    const verifyAn = () => {
        if (an) {
            setErrorAn(false);
            return 1;
        }
        else {
            setErrorAn(true);
            return 0;
        }
    };

    const handleButton = () => {
        if (
            verifyNume() &
            verifyPrenume() &
            verifyUniversitate() &
            verifyFacultate() &
            verifyAn()
        ) {
            const user = auth.currentUser;
            console.log(user);
            const db = FIREBASE_DATABASE;

            setDoc(doc(db, "voluntarInfo", user.uid), {
                Email: user.email,
                Nume: nume,
                Prenume: prenume,
                Universitate: universitate,
                Facultate: facultate,
                An: an
                },
                {
                merge: true
            }).then(() => navigation.navigate("MeniuVoluntar"));
        }
    }

    return (
        <SafeAreaView style={containerStyle.container}>

                <StatusBar translucent/>

                <Animated.View style={[containerStyle.topReduced, {backgroundColor: '#B4E4FF'}]}>
                    <View style={[containerStyle.topContainer, {justifyContent: 'center'}]}>
                        <Text style={textStyle.uniVolunteer}>UniVolunteer</Text>
                    </View>
                </Animated.View>


                <ScrollView
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], { useNativeDriver: false })}
                    scrollEventThrottle={16}
                    style={containerStyle.middleExtended}
                >
                    <Text style={textStyle.head}>Introducere</Text>
                    <Text style={textStyle.head}>date</Text>
                    <Text style={textStyle.subHead}>Completați toate câmpurile!</Text>

                    <TextInput
                        placeholder="Nume"
                        style={[inputStyle.textInput, {marginTop: 40}]}
                        placeholderTextColor='#999999'
                        value={nume}
                        onChangeText={(text) => setNume(text)}
                    />
                    {
                        errorNume &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20, marginTop: 5}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Nu ați introdus numele!</Text>
                        </View>
                    }

                    <TextInput
                        placeholder="Prenume"
                        style={[inputStyle.textInput, {marginTop: 20}]}
                        placeholderTextColor='#999999'
                        value={prenume}
                        onChangeText={(text) => setPrenume(text)}
                    />

                    {
                        errorPrenume &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20, marginTop: 5}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Nu ați introdus prenumele!</Text>
                        </View>
                    }

                    <TextInput
                        placeholder="Universitatea"
                        style={[inputStyle.textInput, {marginTop: 20}]}
                        placeholderTextColor='#999999'
                        value={universitate}
                        onChangeText={(text) => setUniversitate(text)}
                    />

                    {
                        errorUniversitate &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20, marginTop: 5}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Nu ați introdus universitatea!</Text>
                        </View>
                    }

                    <TextInput
                        placeholder="Facultatea"
                        style={[inputStyle.textInput, {marginTop: 20}]}
                        placeholderTextColor='#999999'
                        value={facultate}
                        onChangeText={(text) => setFacultate(text)}
                    />

                    {
                        errorFacultate &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20, marginTop: 5}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Nu ați introdus facultatea!</Text>
                        </View>
                    }

                    <TextInput
                        placeholder="Anul"
                        style={[inputStyle.textInput, {marginTop: 20}]}
                        placeholderTextColor='#999999'
                        value={an}
                        onChangeText={(text) => setAn(text)}
                    />

                    {
                        errorAn &&
                        <View style={[errorStyle.errorContainer, {marginLeft: 20, marginTop: 5}]}>
                            <Image style={errorStyle.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={errorStyle.errorText}>Nu ați introdus anul!</Text>
                        </View>
                    }

                    <View style={{height: 150, width: '100%'}}></View>

                </ScrollView>

                <Animated.View style={containerStyle.bottom}>
                    <TouchableOpacity style={buttonStyle.button} onPress={handleButton}>
                        <Text style={buttonStyle.buttonText}>Creare cont</Text>
                    </TouchableOpacity>
                </Animated.View>
        </SafeAreaView>
    );
};

export default IntroduceDate;