import {
    KeyboardAvoidingView,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput, Alert, Animated, ScrollView
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useFonts} from "expo-font";
import React, {useState} from "react";
import {doc, getDoc, setDoc} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebase";

const IntroduceDate = ({navigation}) => {

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

    const scroll = new Animated.Value(0);
    const headerHeight = scroll.interpolate({
        inputRange: [0, 100],
        outputRange: [100, 50],
        extrapolate: 'clamp'
    });

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
        <SafeAreaView style={styles.container}>

                <StatusBar translucent/>
                <Animated.View style = {[styles.topBar]}>
                    <View style={{height: 45, width: '90%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.uniVolunteer}>UniVolunteer</Text>
                    </View>
                </Animated.View>

                <ScrollView
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], { useNativeDriver: false })}
                    scrollEventThrottle={16}
                >
                    <Text style={[styles.headerText, styles.paddingTop20, styles.paddingLeft5]}>Introducere</Text>
                    <Text style={[styles.headerText, styles.paddingLeft5, {paddingBottom: 20}]}>date</Text>
                    <Text style={styles.subHead}>Completați toate câmpurile!</Text>
                    <TextInput
                        placeholder="Nume"
                        style={[styles.textInput, {marginTop: 40}]}
                        placeholderTextColor='#999999'
                        value={nume}
                        onChangeText={(text) => setNume(text)}
                    />
                    {
                        errorNume &&
                        <View style={styles.error}>
                            <Image style={styles.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={styles.errorText}>Nu ați introdus numele!</Text>
                        </View>
                    }

                    <TextInput
                        placeholder="Prenume"
                        style={[styles.textInput, {marginTop: 20}]}
                        placeholderTextColor='#999999'
                        value={prenume}
                        onChangeText={(text) => setPrenume(text)}
                    />

                    {
                        errorPrenume &&
                        <View style={styles.error}>
                            <Image style={styles.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={styles.errorText}>Nu ați introdus prenumele!</Text>
                        </View>
                    }

                    <TextInput
                        placeholder="Universitatea"
                        style={[styles.textInput, {marginTop: 20}]}
                        placeholderTextColor='#999999'
                        value={universitate}
                        onChangeText={(text) => setUniversitate(text)}
                    />

                    {
                        errorUniversitate &&
                        <View style={styles.error}>
                            <Image style={styles.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={styles.errorText}>Nu ați introdus universitatea!</Text>
                        </View>
                    }


                    <TextInput
                        placeholder="Facultatea"
                        style={[styles.textInput, {marginTop: 20}]}
                        placeholderTextColor='#999999'
                        value={facultate}
                        onChangeText={(text) => setFacultate(text)}
                    />

                    {
                        errorFacultate &&
                        <View style={styles.error}>
                            <Image style={styles.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={styles.errorText}>Nu ați introdus facultatea!</Text>
                        </View>
                    }

                    <TextInput
                        placeholder="Anul"
                        style={[styles.textInput, {marginTop: 20}]}
                        placeholderTextColor='#999999'
                        value={an}
                        onChangeText={(text) => setAn(text)}
                    />

                    {
                        errorAn &&
                        <View style={styles.error}>
                            <Image style={styles.errorImage} source={require("../../images/errorMessage.png")}/>
                            <Text style={styles.errorText}>Nu ați introdus anul!</Text>
                        </View>
                    }

                    <View style={{height: 100, width: '100%'}}></View>
                </ScrollView>

                <Animated.View style={styles.bottomBox}>
                    <TouchableOpacity style={styles.button} onPress={handleButton}>
                        <Text style={styles.buttonText}>Creare cont</Text>
                    </TouchableOpacity>
                </Animated.View>
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
        //backgroundColor: 'white',
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
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10%'
    },
});

export default IntroduceDate;

/*<KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style = {{flex: 1}}
                enabled={false}
            >*/