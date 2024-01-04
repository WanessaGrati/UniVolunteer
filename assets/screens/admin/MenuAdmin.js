import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {signOut} from "firebase/auth";
import { FIREBASE_AUTH} from "../../../firebase";
import {buttonStyle, containerStyle, imageStyle, paddingStyle, textStyle} from "../../resorces/style";
import {MontserratFonts} from "../../resorces/MontserratFonts";


const MenuAdmin = ({navigation}) => {
    const auth = FIREBASE_AUTH;

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

    const logOut = async () => {
        try {
            await signOut(auth);
            navigation.navigate("Login");
        } catch (error) {
            alert("Error during logout!");
        }
    }

    const goToAddVoluntar = () => {
        navigation.navigate('AddVoluntar');
    };

    const goToGenerateQRCode = () => {
        navigation.navigate('GenerareQRCode');
    };

    const goToVoluntari = () => {
        navigation.navigate('VoluntariInregistrati');
    };

    const goToActivities = () => {
        navigation.navigate('CereriActivitati');
    };

    return (
        <View style={containerStyle.container}>

            <StatusBar translucent/>

            <View style={containerStyle.topExtended}>
                <Text style={textStyle.appName}>UniVolunteer</Text>
                <View style={{paddingTop: 60, paddingLeft: '5%'}}>
                    <Text style={textStyle.head}>Salut,</Text>
                    <Text style={textStyle.head}>UniVolunteer!</Text>
                    <Text style={textStyle.subHead}>Ai 65 de voluntari</Text>
                </View>
            </View>

            <View style={containerStyle.middleReduced}>

                <View style={{flexDirection: 'row'}}>

                    <TouchableOpacity style={buttonStyle.buttonMenu} onPress={goToAddVoluntar}>
                        <Image style={imageStyle.imageMenu} source={require("../../images/add.png")}/>
                        <Text style={[paddingStyle.paddingTop10, buttonStyle.buttonMenuText]}>Adaugă</Text>
                        <Text style={buttonStyle.buttonMenuText}>voluntar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[buttonStyle.buttonMenu, {marginLeft: 20}]} onPress={goToActivities}>
                        <Image style={imageStyle.imageMenu} source={require("../../images/bell.png")}/>
                        <Text style={[paddingStyle.paddingTop10, buttonStyle.buttonMenuText]}>Lista de</Text>
                        <Text style={buttonStyle.buttonMenuText}>notificări</Text>
                    </TouchableOpacity>

                </View>

                <View style={{flexDirection: 'row', marginTop: 20}}>

                    <TouchableOpacity style={buttonStyle.buttonMenu} onPress={goToGenerateQRCode}>
                        <Image style={imageStyle.imageMenu} source={require("../../images/qr_code.png")}/>
                        <Text style={[paddingStyle.paddingTop10, buttonStyle.buttonMenuText]}>Generare</Text>
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

                    <TouchableOpacity onPress={goToVoluntari}>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/voluntari.png")}/>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

export default MenuAdmin;