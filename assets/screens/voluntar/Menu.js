import {Image, Text, TouchableOpacity, View} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebase";
import { buttonStyle, containerStyle, imageStyle, paddingStyle, textStyle } from "../../resorces/style";
import { MontserratFonts } from "../../resorces/MontserratFonts";
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { doc, getDoc } from "firebase/firestore";

export let aprovedHours = 0;

const Menu = ({navigation}) => {

    const auth = FIREBASE_AUTH;
    const database = FIREBASE_DATABASE;
    const [totalOre, setTotalOre] = useState(0);
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [universitatea, setUniversitate] = useState('');
    const [facultatea, setFacultate] = useState('');
    const [an, setAn] = useState('');
    const [activities, setActivities] = useState({});

    const [noActivities, setNoActivities] = useState(false);

    const [htmlList, setHtmlList] = useState('');

    const [fontsLoaded] = MontserratFonts()

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

            const userDataActivities = await getDoc(doc(database, "activitati", user.uid));
            const userActivities = userDataActivities.data().activities;

            console.log("Zaebisi");
            console.log(userActivities);

            if (userActivities === null || userActivities === undefined) setActivities(null);
            else setActivities(userActivities);

            //console.log(activities);

            setNume(n);
            setPrenume(p);
            setUniversitate(u);
            setFacultate(f);
            setAn(a);
        }

        const generateHTML = () => {
            setTotalOre(0);

            let titlu = '';
            let date = '';
            let hours = 0;
            let activityHtml = '';
            let total = 0;

            if (activities !== null) {

                Object.entries(activities).map(([activityKey, activity]) => {
                    if (activity.status === 'aproved') {
                        titlu = activity.titlu;
                        date = activity.date;
                        hours = activity.hours;
                        total += parseInt(activity.hours);

                        activityHtml += htmlActivity(titlu, date, hours);
                    }
                });
            }

            setHtmlList(activityHtml);
            setTotalOre(total);
            aprovedHours = total;

            return 1;
        }

        getUserInformation().then(() => generateHTML());

    }, [activities]);

    if (!fontsLoaded) return undefined;

    const logOut = async () => {
        try {
            await signOut(auth);
            navigation.navigate("Login");
        } catch (error) {
            alert("Error during logout!");
        }
    }

    const goToAddActivity = () => {
        navigation.navigate('AddActivity');
    };

    const goToActivities = () => {
        navigation.navigate('OreleInregistrate');
    };

    const html = `
        <html>
        <style>
            @page {
                margin: 1cm;
            }
            
            body {
                margin: 1cm;
            }
            
            p {
                font-size: 20px;
            }
        </style>
            <body>
                <h1><b>Raport de voluntariat</b></h1>
                <br>
                    <p>
                        Prin prezenta se atestă faptul că studentul(a)
                        <b>${nume} ${prenume}</b>,
                        înscrisă la <b>${universitatea}</b>, 
                        facultatea <b>${facultatea}</b>,
                        anul <b>${an}</b>,
                        are un număr de <b>${totalOre} ore de voluntariat</b>.
                    </p>
                    <br>
                    <p>${htmlList}</p>
                    <br>
                    <p><b>Total: ${totalOre}</b></p>
            </body>
        </html>
    `;

    const htmlActivity = (titlu, date, hours) => {
        return `<p>
                    Activitate: <b>${titlu}</b><br>
                    Data: <i>${date}</i> <br>
                    Ore: ${hours} <br>
                </p>`;
    }

    const generatePDF = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false
        });

        await shareAsync(file.uri);
    }

    const goToScan = () => {
        navigation.navigate('scanQRCode');
    }

    const goToProfile = () => {
        navigation.navigate('Profile');
    }


    return (
        <View style={containerStyle.container}>
            <StatusBar translucent/>

            <View style={containerStyle.topExtended}>
                <Text style={textStyle.appName}>UniVolunteer</Text>
                <View style={{paddingTop: 60, paddingLeft: '5%'}}>
                    <Text style={textStyle.head}>Salut,</Text>
                    <Text style={textStyle.head}>{prenume}!</Text>
                    <Text style={textStyle.subHead}>Ai {totalOre} ore de voluntariat</Text>
                </View>
            </View>

            <View style={containerStyle.middleReduced}>

                <View style={{flexDirection: 'row'}}>

                    <TouchableOpacity style={buttonStyle.buttonMenu} onPress={goToAddActivity}>
                        <Image style={imageStyle.imageMenu} source={require("../../images/add.png")}/>
                        <Text style={[paddingStyle.paddingTop10, buttonStyle.buttonMenuText]}>Adăugare</Text>
                        <Text style={buttonStyle.buttonMenuText}>activitate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[buttonStyle.buttonMenu, {marginLeft: 20}]} onPress={generatePDF}>
                        <Image style={imageStyle.imageMenu} source={require("../../images/document.png")}/>
                        <Text style={[paddingStyle.paddingTop10, buttonStyle.buttonMenuText]}>Generare</Text>
                        <Text style={buttonStyle.buttonMenuText}>raport</Text>
                    </TouchableOpacity>

                </View>

                <View style={{flexDirection: 'row', marginTop: 20}}>

                    <TouchableOpacity style={buttonStyle.buttonMenu} onPress={goToScan}>
                        <Image style={imageStyle.imageMenu} source={require("../../images/qr_code.png")}/>
                        <Text style={[paddingStyle.paddingTop10, buttonStyle.buttonMenuText]}>Scan</Text>
                        <Text style={buttonStyle.buttonMenuText}>qr-code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[buttonStyle.buttonMenu, {marginLeft: 20}]} onPress={logOut}>
                        <Image style={imageStyle.imageMenu} source={require("../../images/sign_out.png")}/>
                        <Text style={[paddingStyle.paddingTop10, buttonStyle.buttonMenuText]}>Ieșire</Text>
                        <Text style={buttonStyle.buttonMenuText}>din cont</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={containerStyle.bottom}>
                <View style={containerStyle.menuBottom}>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/home_bold.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToActivities}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/list.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToProfile}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/user.png")}/>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

export default Menu;