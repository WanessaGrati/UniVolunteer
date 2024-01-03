import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH} from "../../../firebase";


const Menu = ({navigation}) => {
    const auth = FIREBASE_AUTH;
    const [fontsLoaded] = useFonts({
        "MontserratMedium": require("../../fonts/Montserrat/Montserrat-Medium.ttf"),
        "MontserratBold": require("../../fonts/Montserrat/Montserrat-Bold.ttf"),
        "MontserratLight": require("../../fonts/Montserrat/Montserrat-Light.ttf"),
    })

    if (!fontsLoaded) {
        return undefined;
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            navigation.navigate("Login");
        } catch (error) {
            alert("Error during logout!");
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent/>
            <View style={styles.box}>
                <Text style={styles.appName}>UniVolunteer</Text>
                <Text style={[styles.salutText, styles.paddingTop40, styles.paddingLeft5]}>Salut,</Text>
                <Text style={[styles.salutText, styles.paddingLeft5]}>Prenume!</Text>
                <Text style={[styles.oreDeVoluntariat, styles.paddingLeft5]}>Ai 65 de ore de voluntariat</Text>
            </View>

            <View style={styles.paddingTop40}>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button}>
                        <Image style={styles.image} source={require("../../images/add.png")}/>
                        <Text style={[{paddingTop: 10}, styles.textButton]}>Adăugare</Text>
                        <Text style={styles.textButton}>activitate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {marginLeft: 20}]}>
                        <Image style={styles.image} source={require("../../images/document.png")}/>
                        <Text style={[{paddingTop: 10}, styles.textButton]}>Generare</Text>
                        <Text style={styles.textButton}>raport</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: 20}}>
                    <TouchableOpacity style={styles.button}>
                        <Image style={styles.image} source={require("../../images/qr_code.png")}/>
                        <Text style={[{paddingTop: 10}, styles.textButton]}>Scan</Text>
                        <Text style={styles.textButton}>qr-code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {marginLeft: 20}]} onPress={logOut}>
                        <Image style={styles.image} source={require("../../images/sign_out.png")}/>
                        <Text style={[{paddingTop: 10}, styles.textButton]}>Ieșire</Text>
                        <Text style={styles.textButton}>din cont</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomBox}>
                <View style={styles.menu}>
                    <TouchableOpacity>
                        <Image style={styles.imageMenu} source={require("../../images/home_bold.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.imageMenu} source={require("../../images/list.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.imageMenu} source={require("../../images/user.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    box: {
        width: '100%',
        height: '38%',
        backgroundColor: '#F7C8E0',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },

    appName: {
        paddingTop: 50,
        fontSize: 20,
        fontFamily: 'MontserratMedium',
        alignSelf: 'center'
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

    salutText: {
        fontFamily: 'MontserratBold',
        fontSize: 40
    },

    oreDeVoluntariat: {
        fontFamily: 'MontserratLight',
        fontSize: 21,
        paddingTop: 20
    },

    image: {
        width: 50,
        height: 50
    },

    button: {
        borderWidth: 2,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },

    textButton: {
        fontFamily: "MontserratLight",
        fontSize: 15
    },

    bottomBox: {
        backgroundColor: 'white',
        width: '100%',
        height: '10%',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    menu: {
        width:'55%',
        height: 30,
        backgroundColor:'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    imageMenu: {
        width: 25,
        height: 25
    }
});

export default Menu;