import {containerStyle, imageStyle, paddingStyle, textStyle, buttonStyle} from "../../resorces/style";
import {Animated, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {MontserratFonts} from "../../resorces/MontserratFonts";
import {Dimensions} from "react-native";
import {useEffect, useState} from "react";
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "../../../firebase";
import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";


const CereriActivitati = ({navigation}) => {

    const auth = FIREBASE_AUTH;
    const database = FIREBASE_DATABASE;

    const [users, setUsers] = useState({});
    const [totalActivities, setTotalActivities] = useState(false);

    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [userUID, setUserUID] = useState('');

    const [fontsLoaded] = MontserratFonts();

    useEffect( () => {
        const getUsers = async () => {
            const usersActivities = await getDocs(collection(database, "activitati"));

            const data = usersActivities.docs.map((doc) => ({
                id: doc.id,
                ...doc.data().activities,
            }));

            setUsers(data);

            if (data === null || data === undefined) setTotalActivities(false);
            else setTotalActivities(true);
        }

        getUsers().then(() => console.log("\n"));

    }, []);

    if (!fontsLoaded) return undefined;

    const screenHeight = Dimensions.get('window').height;

    const scroll = new Animated.Value(0);
    const headerHeight = scroll.interpolate({
        inputRange: [0, screenHeight * 0.4],
        outputRange: [screenHeight * 0.4, screenHeight * 0.15],
        extrapolate: 'clamp'
    });

    const ActivityItemWaiting = ({title, nume, prenume, hours, totalOre, onApprove, onDecline}) => (
        <View>
            <View style={paddingStyle.paddingTop20}/>

            <View style={[containerStyle.activity, {height: 170}]}>
                <View>
                    <Text style={textStyle.titleActivity}>{title}</Text>
                    <Text style={textStyle.numePrenume}>{nume} {prenume}</Text>
                    <Text style={textStyle.hoursActivity}>{hours}</Text>
                    <View style={{paddingTop: 10}}/>
                    <Text style={[textStyle.numePrenume, {fontSize: 14, fontFamily: "MontserratSemiBold"}]}>Total: {totalOre} ore</Text>
                </View>

                <View style={paddingStyle.paddingTop20}/>

                <View style={containerStyle.activityRow}>
                    <TouchableOpacity style={buttonStyle.buttonDecline} onPress={onDecline}>
                        <Text style={[buttonStyle.buttonText, {fontSize: 16, color: "#FB6962"}]}>Refuză</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={buttonStyle.buttonApprove} onPress={onApprove}>
                        <Text style={[buttonStyle.buttonText, {fontSize: 16}]}>Acceptă</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const goToHome = () => {
        navigation.navigate('MeniuAdmin');
    }

    const goToVoluntari = () => {
        navigation.navigate('VoluntariInregistrati');
    }

    const imageActivity = (status) => {
        switch (status) {
            case 'declined': return require('../../images/declined-red.png');
            case 'aproved': return require('../../images/approved-green.png');
        }
    }

    const ActivityItem = ({title, nume, prenume, hours, statusImage, totalOre}) => (
        <View>
            <View style={paddingStyle.paddingTop20}/>

            <View style={[containerStyle.activity, {height: 120}]}>
                <View style={containerStyle.activityRow}>
                    <View>
                        <Text style={textStyle.titleActivity}>{title}</Text>
                        <Text style={textStyle.numePrenume}>{nume} {prenume}</Text>
                        <Text style={textStyle.hoursActivity}>{hours}</Text>
                        <View style={{paddingTop: 10}}/>
                        <Text style={[textStyle.numePrenume, {fontSize: 14, fontFamily: "MontserratSemiBold"}]}>Total: {totalOre} ore</Text>
                    </View>

                    <Image style={imageStyle.imageStatusActivity} source={statusImage}/>
                </View>
            </View>
        </View>
    );

    const approveButton = async (userUID, activity) => {
        await updateDoc(doc(database, "activitati", userUID, "activities", activity), {
            status: "aproved"
        });
    }

    const declineButton = async (userUID, activity) => {
        await updateDoc(doc(database, "activitati", userUID, "activities", activity), {
            status: "declined"
        });
    }

    return(
        <SafeAreaView style={containerStyle.container}>

            <StatusBar translucent/>

            <Animated.View style={[containerStyle.topExtended, {backgroundColor: '#DFFFD8', height: headerHeight}]}>
                <Text style={textStyle.appName}>UniVolunteer</Text>
                <View style={{paddingTop: 60, paddingLeft: '5%'}}>
                    <Text style={textStyle.head}>Cereri</Text>
                    <Text style={textStyle.head}>activități</Text>
                    <Text style={textStyle.subHead}>Ai x de cereri noi</Text>
                </View>
            </Animated.View>

            <ScrollView
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
                style={[containerStyle.middleExtended, {paddingTop: 20}]}
            >

                {
                    totalActivities &&
                    Object.keys(users).map((userID) => (
                        <View key = {userID}>
                            {
                                Object.keys(users[userID]).map((activityKey) => {
                                    const activity = users[userID][activityKey];

                                    console.log(users[userID][activityKey]);

                                    if (activity.status === "waiting") {
                                        return (
                                            <View key = {activityKey}>
                                                <ActivityItemWaiting 
                                                    title={activity.titlu} 
                                                    hours={activity.date}
                                                    nume={activity.nume}
                                                    prenume={activity.prenume}
                                                    totalOre={activity.hours}
                                                    onApprove={() => approveButton(userID, activity)}
                                                    onDecline={() => declineButton(userID, activity)}
                                                />
                                            </View>
                                        )
                                    } 
                                    else if (activity.status === 'declined' || activity.status === 'aproved') {
                                        return (
                                            <View key = {activityKey}>
                                                <ActivityItem
                                                    title={activity.titlu} 
                                                    hours={activity.date}
                                                    nume={activity.nume}
                                                    prenume={activity.prenume}
                                                    statusImage={imageActivity(activity.status)}
                                                    totalOre={activity.hours}
                                                />
                                            </View>
                                        )
                                    }
                                })
                            }

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

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/list_bold.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToVoluntari}>
                    <Image style={imageStyle.imageMenuBottom} source={require("../../images/voluntari.png")}/>
                    </TouchableOpacity>

                </View>
            </View>


        </SafeAreaView>
    )
};

export default CereriActivitati;

/*<ActivityItemWaiting 
                    title="Titlu" 
                    hours="oo.mm zz.ll.aaaa"
                    nume="Nume"
                    prenume="Prenume"
                    totalOre="2"
                />

                <ActivityItem
                    title="Titlu" 
                    hours="oo.mm zz.ll.aaaa"
                    nume="Nume"
                    prenume="Prenume"
                    statusImage={require('../../images/declined-red.png')}
                    totalOre="5"
                />

                <ActivityItemWaiting 
                    title="Titlu" 
                    hours="oo.mm zz.ll.aaaa"
                    nume="Nume"
                    prenume="Prenume"
                    totalOre="2"
                />

                <ActivityItem
                    title="Titlu" 
                    hours="oo.mm zz.ll.aaaa"
                    nume="Nume"
                    prenume="Prenume"
                    statusImage={require('../../images/approved-green.png')}
                    totalOre="5"
                />*/