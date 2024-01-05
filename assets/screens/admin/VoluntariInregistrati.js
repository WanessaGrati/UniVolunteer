import {containerStyle, imageStyle, paddingStyle, textStyle, buttonStyle} from "../../resorces/style";
import {Animated, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {MontserratFonts} from "../../resorces/MontserratFonts";
import {Dimensions} from "react-native";
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "../../../firebase";
import {useEffect, useState} from "react";
import {doc, getDoc, getDocs, collection} from "firebase/firestore";


const VoluntariInregistrati = ({navigation}) => {

    const auth = FIREBASE_AUTH;
    const database = FIREBASE_DATABASE;

    const [allUsers, setAllUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    const [fontsLoaded] = MontserratFonts();

    useEffect( () => {
        const getUser = async () => {

            const usersData = await getDocs(collection(database, "voluntarInfo"));

            const data = usersData.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log(data);

            setAllUsers(data);
            setTotalUsers(data.length);
        }

        getUser().then(() => console.log(""));

    }, []);


    if (!fontsLoaded) return undefined;

    const screenHeight = Dimensions.get('window').height;

    const scroll = new Animated.Value(0);
    const headerHeight = scroll.interpolate({
        inputRange: [0, screenHeight * 0.4],
        outputRange: [screenHeight * 0.4, screenHeight * 0.15],
        extrapolate: 'clamp'
    });

    const Voluntar = ({nume, prenume, email, universitate, facultate, an, ore}) => (
        <View>
            <View style={paddingStyle.paddingTop20}/>

            <View style={[containerStyle.activity, {height: 160}]}>
                <View>
                    <Text style={textStyle.titleActivity}>{nume} {prenume}</Text>
                    <Text style={[textStyle.numePrenume, {fontSize: 16}]}>{email}</Text>
                    <Text style={[textStyle.numePrenume, {fontSize: 12, fontFamily: "MontserratItalic"}]}>{universitate}</Text>
                    <Text style={[textStyle.numePrenume, {fontSize: 12, fontFamily: "MontserratItalic"}]}>{facultate}</Text>
                    <Text style={[textStyle.numePrenume, {fontSize: 12, fontFamily: "MontserratItalic"}]}>Anul {an}</Text>
                    <View style={{paddingTop: 10}}/>
                    <Text style={[textStyle.numePrenume, {fontFamily: "MontserratSemiBold"}]}>Total ore: {ore}</Text>
                </View>
            </View>
        </View>
    );

    const goToHome = () => {
        navigation.navigate('MeniuAdmin');
    }

    const goToActivities = () => {
        navigation.navigate('CereriActivitati');
    }

    return(
        <SafeAreaView style={containerStyle.container}>

            <StatusBar translucent/>

            <Animated.View style={[containerStyle.topExtended, {backgroundColor: '#B4E4FF', height: headerHeight}]}>
                <Text style={textStyle.appName}>UniVolunteer</Text>
                <View style={{paddingTop: 60, paddingLeft: '5%'}}>
                    <Text style={textStyle.head}>Voluntari</Text>
                    <Text style={textStyle.head}>înregistrați</Text>
                    <Text style={textStyle.subHead}>Ai {totalUsers} voluntari</Text>
                </View>
            </Animated.View>

            <ScrollView
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
                style={[containerStyle.middleExtended, {paddingTop: 20}]}
            >
                {
                    allUsers.map((data, index) => (
                        <View key = {index}>
                            <Voluntar
                                nume={data.Nume}
                                prenume={data.Prenume}
                                email={data.Email}
                                universitate={data.Universitate}
                                facultate={data.Facultate}
                                an={data.An}
                                ore="xx"
                            />
                        </View>
                    ))
                }

                <View style={{height: 150, width: '100%'}}></View>
            </ScrollView>

            <View style={containerStyle.bottom}>
                <View style={containerStyle.menuBottom}>

                    <TouchableOpacity onPress={goToHome}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/home.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToActivities}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/list.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/voluntari_bold.png")}/>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
};

export default VoluntariInregistrati;