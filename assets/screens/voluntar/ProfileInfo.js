import {Image, Text, TouchableOpacity, View} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebase";
import { containerStyle, imageStyle, paddingStyle, textStyle } from "../../resorces/style";
import { MontserratFonts } from "../../resorces/MontserratFonts";
import { doc, getDoc } from "firebase/firestore";

const Menu = ({navigation}) => {
    const auth = FIREBASE_AUTH;
    const database = FIREBASE_DATABASE;

    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [email, setEmail] = useState('');
    const [universitatea, setUniversitate] = useState('');
    const [facultatea, setFacultate] = useState('');
    const [an, setAn] = useState('');


    const [fontsLoaded] = MontserratFonts();

    useEffect( () => {
        const getUserInformation = async () => {

            const user = auth.currentUser;
            const userData = await getDoc(doc(database, "voluntarInfo", user.uid));
            const data = userData.data();

            let n = data.Nume;
            let p = data.Prenume;
            let u = data.Universitate;
            let f = data.Facultate;
            let a = data.An;
            let e = data.Email;

            const userDataActivities = await getDoc(doc(database, "activitati", user.uid));
            const userActivities = userDataActivities.data().activities;

            setNume(n);
            setPrenume(p);
            setUniversitate(u);
            setFacultate(f);
            setAn(a);
            setEmail(e);
        }

        getUserInformation().then(() => console.log(""));

    }, []);

    if (!fontsLoaded) return undefined;

    const logOut = async () => {
        try {
            await signOut(auth);
            navigation.navigate("Login");
        } catch (error) {
            alert("Error during logout!");
        }
    };

    const goToActivities = () => {
        navigation.navigate('OreleInregistrate');
    };

    const goToMenu = () => {
        navigation.navigate('MeniuVoluntar');
    }

    const ActivityItem = ({text1, text2}) => (
        <View>
            <View style={paddingStyle.paddingTop20}/>

            <View style={[containerStyle.activity, {height: 75, width: '95%'}]}>
                <Text style={{fontSize: 18, fontFamily: "MontserratSemiBold"}}>{text1}</Text>
                <Text style={{fontSize: 14, fontFamily: "MontserratItalic"}}>{text2}</Text>
            </View>
        </View>
    );

    return (
        <View style={containerStyle.container}>
            <StatusBar translucent/>

            <View style={[containerStyle.topExtended, {backgroundColor: "#B4E4FF"}]}>
                <Text style={textStyle.appName}>UniVolunteer</Text>
                <View style={{paddingTop: 60, paddingLeft: '5%'}}>
                    <Text style={textStyle.head}>{nume}</Text>
                    <Text style={textStyle.head}>{prenume}</Text>
                    <Text style={textStyle.subHead}>{email}</Text>
                </View>
            </View>

            <View style={[containerStyle.middleReduced, {justifyContent: 'left', alignItems: 'left', paddingLeft: '5%', marginTop: 20}]}>
                <ActivityItem
                    text1="Universitatea: "
                    text2={universitatea}
                />

                <ActivityItem
                    text1="Facultatea: "
                    text2={facultatea}
                />

                <ActivityItem
                    text1="Anul: "
                    text2={an}
                />

            </View>

            <View style={containerStyle.bottom}>
                <View style={containerStyle.menuBottom}>

                    <TouchableOpacity onPress={goToMenu}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/home.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToActivities}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/list.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/user_bold.png")}/>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

export default Menu;