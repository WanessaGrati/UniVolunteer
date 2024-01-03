import React, { useState, useEffect } from 'react';
import {View, ScrollView, Animated, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useFonts} from "expo-font";

const GenerateQRCode = () => {

    const [fontsLoaded] = useFonts({
        "MontserratMedium": require("../../fonts/Montserrat/Montserrat-Medium.ttf"),
        "MontserratBold": require("../../fonts/Montserrat/Montserrat-Bold.ttf"),
        "MontserratLight": require("../../fonts/Montserrat/Montserrat-Light.ttf"),
        "MontserratRegular": require("../../fonts/Montserrat/Montserrat-Regular.ttf")
    });

    if (!fontsLoaded) {
        return undefined;
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent/>
            <View style={styles.topBar}>
                <View style={{width: '90%', height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity>
                        <Image source={require("../../images/inapoi.png")} style={styles.image}/>
                    </TouchableOpacity>
                    <Text style={styles.uniVolunteer}>UniVolunteer</Text>
                    <View style={{height: 45, width: 45}}></View>
                </View>
            </View>
            <View>
                <Text style={[styles.salutText, styles.paddingTop20, styles.paddingLeft5]}>Generează</Text>
                <Text style={[styles.salutText, styles.paddingLeft5, {paddingBottom: 20}]}>qr-code</Text>
                <Text style={styles.campObligatoriu}>Câmpurile obligatorii sunt marcate cu *</Text>
                <Text style={styles.textExplicativ}>Titlul activității:*</Text>
                <TextInput placeholder="Introduceți titlul activității" style={styles.textInput} placeholderTextColor='#000000'/>
                <Text style={styles.textExplicativ}>De la:*</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput placeholder="zz.ll.aaaa" style={[styles.textInput, {width: '55%'}]} placeholderTextColor='#000000'/>
                    <TextInput placeholder="oo.mm" style={[styles.textInput, {width: '30%'}]} placeholderTextColor='#000000'/>
                </View>
                <Text style={styles.textExplicativ}>Până la:*</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput placeholder="zz.ll.aaaa" style={[styles.textInput, {width: '55%'}]} placeholderTextColor='#000000'/>
                    <TextInput placeholder="oo.mm" style={[styles.textInput, {width: '30%'}]} placeholderTextColor='#000000'/>
                </View>
                <Text style={styles.textExplicativ}>Alte mențiuni:</Text>
                <TextInput placeholder="Introduceți alte mențiuni" style={[styles.textInput, {height: 100}]} placeholderTextColor='#000000'/>
            </View>

            <View style={styles.bottomBox}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Generează</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    image: {
        height: 45,
        width: 45,
        justifyContent: 'flex-start'
    },

    uniVolunteer: {
        fontSize: 20,
        fontFamily: 'MontserratRegular',
        //flex: 1,
    },

    topBar: {
        backgroundColor: '#F7C8E0',
        width: '100%',
        height: '15%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingTop: 40,
        paddingLeft: '5%',
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

    textInput: {
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderRadius: 25,
        paddingLeft: 20,
        marginLeft: '5%'
    },

    button: {
        width: 200,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'MontserratLight',
        fontSize: 18
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

    campObligatoriu: {
        paddingLeft: '10%',
        fontFamily: "MontserratRegular",
        paddingBottom: 20,
        paddingTop: 20,
        fontSize: 10
    },

    textExplicativ: {
        paddingLeft: '10%',
        fontFamily: "MontserratRegular",
        paddingBottom: 5,
        paddingTop: 20,
        fontSize: 14
    },
});
export default GenerateQRCode;