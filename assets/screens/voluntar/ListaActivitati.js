import {
    KeyboardAvoidingView,
    Image,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";

import {StatusBar} from "expo-status-bar";
import React from "react";
import {MontserratFonts} from "../../resorces/MontserratFonts";

const ListaActivitati = ({navigation}) => {

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

    const handleBack = () => {
        navigation.navigate("Login");
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
                enabled={false}
            >
                <StatusBar translucent/>
                <View style = {styles.topBar}>
                    <View style={{width: '90%', height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={handleBack}>
                            <Image source={require("../../images/inapoi.png")} style={styles.image}/>
                        </TouchableOpacity>
                        <Text style={styles.uniVolunteer}>UniVolunteer</Text>
                        <View style={{height: 45, width: 45}}></View>
                    </View>
                </View>

                <View>
                    <Text style={[styles.headerText, styles.paddingTop20, styles.paddingLeft5]}>Schimbare</Text>
                    <Text style={[styles.headerText, styles.paddingLeft5, {paddingBottom: 20}]}>parolă</Text>
                    <Text style={styles.subHead}>Trebuie să schimbați parola</Text>
                    <TextInput
                        placeholder="Introduceți parola nouă"
                        style={[styles.textInput, {marginTop: 40}]}
                        placeholderTextColor='#000'
                    />

                    <TextInput
                        placeholder="Repetați parola introdusă"
                        style={[styles.textInput, {marginTop: 20}]}
                        placeholderTextColor='#000'
                    />
                </View>

                <View style={styles.bottomBox}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Următorul</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ListaActivitati;