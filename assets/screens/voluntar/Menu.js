import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH} from "../../../firebase";
import { buttonStyle, containerStyle, imageStyle, paddingStyle, textStyle } from "../../resorces/style";
import { MontserratFonts } from "../../resorces/MontserratFonts";


const Menu = ({navigation}) => {
    const auth = FIREBASE_AUTH;

    const [fontsLoaded] = MontserratFonts()
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
    }

    return (
        <View style={containerStyle.container}>
            <StatusBar translucent/>

            <View style={containerStyle.topExtended}>
                <Text style={textStyle.appName}>UniVolunteer</Text>
                <View style={{paddingTop: 60, paddingLeft: '5%'}}>
                    <Text style={textStyle.head}>Salut,</Text>
                    <Text style={textStyle.head}>Prenume!</Text>
                    <Text style={textStyle.subHead}>Ai 65 de ore de voluntariat</Text>
                </View>
            </View>

            <View style={containerStyle.middleReduced}>

                <View style={{flexDirection: 'row'}}>

                    <TouchableOpacity style={buttonStyle.buttonMenu} onPress={goToAddActivity}>
                        <Image style={imageStyle.imageMenu} source={require("../../images/add.png")}/>
                        <Text style={[paddingStyle.paddingTop10, buttonStyle.buttonMenuText]}>Adăugare</Text>
                        <Text style={buttonStyle.buttonMenuText}>activitate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[buttonStyle.buttonMenu, {marginLeft: 20}]}>
                        <Image style={imageStyle.imageMenu} source={require("../../images/document.png")}/>
                        <Text style={[paddingStyle.paddingTop10, buttonStyle.buttonMenuText]}>Generare</Text>
                        <Text style={buttonStyle.buttonMenuText}>raport</Text>
                    </TouchableOpacity>

                </View>

                <View style={{flexDirection: 'row', marginTop: 20}}>

                    <TouchableOpacity style={buttonStyle.buttonMenu}>
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

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/list.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/user.png")}/>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

export default Menu;