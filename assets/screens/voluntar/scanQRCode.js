import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView, SafeAreaView
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {MontserratFonts} from "../../resorces/MontserratFonts";
import {containerStyle, imageStyle, inputStyle, textStyle, errorStyle} from "../../resorces/style";
import {BarCodeScanner} from "expo-barcode-scanner";
import {doc, getDoc, increment, setDoc, updateDoc} from "firebase/firestore";
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "../../../firebase";


const GenerateQRCode = ({navigation}) => {

    const [titlu, setTitlu] = useState('');
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');

    const auth = FIREBASE_AUTH;
    const database = FIREBASE_DATABASE;

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const [fontsLoaded] = MontserratFonts();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const addActivity = async () => {
        const user = auth.currentUser;

        const userDataActivities = await getDoc(doc(database, "activitati", user.uid));
        const userNumePrenume = await getDoc(doc(database, "voluntarInfo", user.uid));
        const nume = userNumePrenume.data().Nume;
        const prenume = userNumePrenume.data().Prenume;
        const uid = user.uid;

        if (!userDataActivities.exists()) {
            setDoc(doc(database, "activitati", user.uid), {
                totalActivities: 1
            }, {
                merge: true
            }).then(()=>console.log(""));
        }
        else {
            setDoc(doc(database, "activitati", user.uid), {
                totalActivities: increment(1)
            }, {
                merge: true
            }).then(()=>console.log(""));
        }

        const totalActivities = userDataActivities.data().totalActivities;
        console.log(totalActivities);

        const activities = {
            [`activity${totalActivities}`]: {
                titlu,
                date,
                hours,
                status: 'aproved',
                nume,
                prenume,
                uid
            }
        };

        setDoc(doc(database, "activitati", user.uid), {
            activities
        }, {
            merge: true
        }).then(() => console.log(""));
    }

    const handleBarCodeScanned = async ({data}) => {
        setScanned(true);
        const [scannedTitlu, scannedData, scannedHours] = data.split('\n');
        setTitlu(scannedTitlu);
        setDate(scannedData);
        setHours(scannedHours);
        await addActivity();
    }

    if (!fontsLoaded) return undefined;

    const goToHome = () => {
        navigation.navigate('MeniuVoluntar');
    };

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
                        <TouchableOpacity onPress={goToHome}>
                            <Image style={imageStyle.imageBack} source={require("../../images/inapoi.png")}/>
                        </TouchableOpacity>

                        <Text style={textStyle.uniVolunteer}>UniVolunteer</Text>
                        <View style={{height: 45, width: 45}}></View>
                    </View>

                </View>
                {
                    scanned &&
                    <View style={containerStyle.middleExtended}>

                        <Text style={textStyle.head}>Activitate</Text>
                        <Text style={textStyle.head}>înregistrată</Text>

                        <Text style={{fontFamily: 'MontserratRegular', fontSize: 20, marginTop: 20}}>Activitate: {titlu}</Text>
                        <Text style={{fontFamily: 'MontserratRegular', fontSize: 20}}>Date: {date}</Text>
                        <Text style={{fontFamily: 'MontserratRegular', fontSize: 20}}>Orele: {hours}</Text>
                    </View>

                }

                {
                    !scanned &&
                    <View style={{ flex: 1 }}>
                        {hasPermission === false ? (
                            <Text>No access to camera</Text>
                        ) : (
                            <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ flex: 1 }} />
                        )}
                    </View>
                }

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default GenerateQRCode;