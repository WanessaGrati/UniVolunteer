import {containerStyle, imageStyle, paddingStyle, textStyle} from "../../resorces/style";
import {Animated, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {MontserratFonts} from "../../resorces/MontserratFonts";
import {Dimensions} from "react-native";
import {useEffect, useState} from "react";
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "../../../firebase";
import {doc, getDoc} from "firebase/firestore";

const OreleInregistrate = ({navigation}) => {

    const auth = FIREBASE_AUTH;
    const database = FIREBASE_DATABASE;

    const [activities, setActivities] = useState({});
    const [totalActivities, setTotalActivities] = useState(false);

    const [fontsLoaded] = MontserratFonts();

    useEffect( () => {
        const getUser = async () => {

            const user = auth.currentUser;
            const userDataActivities = await getDoc(doc(database, "activitati", user.uid));

            const userActivities = userDataActivities.data().activities;
            const userTotalActivities = userDataActivities.data().totalActivities;
            setActivities(userActivities);

            if (userTotalActivities > 0) setTotalActivities(true);
            else setTotalActivities(false);
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

    const goToMenu = () => {
        navigation.navigate('MeniuVoluntar');
    };

    const goToAddActivity = () => {
        navigation.navigate("AddActivity");
    };

    const goToProfile = () => {
        navigation.navigate('Profile');
    }

    const pressButton = () => {}

    const imageActivity = (status) => {
        switch (status) {
            case 'waiting': return require('../../images/waiting-yellow.png');
            case 'declined': return require('../../images/declined-red.png');
            case 'aproved': return require('../../images/approved-green.png');
        }
    }

    const ActivityItem = ({title, hours, statusImage, totalOre}) => (
        <View>
            <View style={paddingStyle.paddingTop20}/>

            <View style={containerStyle.activity}>
                <View style={containerStyle.activityRow}>
                    <View>
                        <Text style={textStyle.titleActivity}>{title}</Text>
                        <Text style={textStyle.hoursActivity}>{hours}</Text>
                        <View style={{paddingTop: 10}}/>
                        <Text style={[textStyle.numePrenume, {fontSize: 14, fontFamily: "MontserratSemiBold"}]}>Total: {totalOre} ore</Text>
                    </View>

                    <Image style={imageStyle.imageStatusActivity} source={statusImage}/>
                </View>
            </View>
        </View>
    );

    return(
        <SafeAreaView style={containerStyle.container}>

            <StatusBar translucent/>

            <Animated.View style={[containerStyle.topExtended, {backgroundColor: '#DFFFD8', height: headerHeight}]}>
                <Text style={textStyle.appName}>UniVolunteer</Text>
                <View style={{paddingTop: 60, paddingLeft: '5%'}}>
                    <Text style={textStyle.head}>Orele</Text>
                    <Text style={textStyle.head}>înregistrate</Text>
                    <Text style={textStyle.subHead}>Ai 65 de ore de voluntariat</Text>
                </View>
            </Animated.View>

            <ScrollView
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
                style={[containerStyle.middleExtended, {paddingTop: 20}]}
            >
                {
                    totalActivities &&
                    Object.entries(activities).map(([activityKey, activity]) => (
                    <View key={activityKey}>
                        <ActivityItem
                            title={activity.titlu}
                            hours={activity.date}
                            statusImage={imageActivity(activity.status)}
                            totalOre={activity.hours}
                        />
                    </View>
                ))}

                <View style={{height: 150, width: '100%'}}></View>
            </ScrollView>

            <View style={{width: '100%', alignItems: 'center', position: 'absolute', bottom: '12%'}}>
                <TouchableOpacity onPress={goToAddActivity}>
                    <Image style={imageStyle.imageAdd} source={require("../../images/add-bold.png")}/>
                </TouchableOpacity>
            </View>

            <View style={containerStyle.bottom}>
                <View style={containerStyle.menuBottom}>

                    <TouchableOpacity onPress={goToMenu}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/home.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={pressButton}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/list_bold.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToProfile}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/user.png")}/>
                    </TouchableOpacity>

                </View>
            </View>


        </SafeAreaView>
    )
};

export default OreleInregistrate;