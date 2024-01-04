import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    KeyboardAvoidingView, SafeAreaView
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {MontserratFonts} from "../../resorces/MontserratFonts";
import {buttonStyle, containerStyle, imageStyle, inputStyle, textStyle} from "../../resorces/style";

const GenerateQRCode = () => {

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

    return (
        <SafeAreaView style={containerStyle.container}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
                enabled={false}
            >
                <StatusBar translucent/>

                <View style={containerStyle.topReduced}>

                    <View style={containerStyle.topContainer}>
                        <TouchableOpacity>
                            <Image style={imageStyle.imageBack} source={require("../../images/inapoi.png")}/>
                        </TouchableOpacity>

                        <Text style={textStyle.uniVolunteer}>UniVolunteer</Text>
                        <View style={{height: 45, width: 45}}></View>
                    </View>

                </View>


                <View style={containerStyle.middleExtended}>

                    <Text style={textStyle.head}>Generează</Text>
                    <Text style={textStyle.head}>qr-code</Text>
                    <Text style={[textStyle.subHead, {fontSize: 12}]}>Câmpurile obligatorii sunt marcate cu *</Text>

                    <Text style={[textStyle.detail, {marginTop: 20}]}>Titlul activității:*</Text>
                    <TextInput
                        placeholder="Introduceți titlul activității"
                        style={[inputStyle.textInput, {marginTop: 5}]}
                        placeholderTextColor='#999999'
                    />

                    <Text style={[textStyle.detail, {marginTop: 20}]}>De la:*</Text>
                    <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', width: '90%'}}>
                        <TextInput
                            placeholder="zz.ll.aaaa"
                            style={[inputStyle.textInput, {width: '60%'}]}
                            placeholderTextColor='#999999'
                        />

                        <TextInput
                            placeholder="oo.mm"
                            style={[inputStyle.textInput, {width: '30%'}]}
                            placeholderTextColor='#999999'
                        />
                    </View>

                    <Text style={[textStyle.detail, {marginTop: 20}]}>Până la:*</Text>
                    <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', width: '90%'}}>
                        <TextInput
                            placeholder="zz.ll.aaaa"
                            style={[inputStyle.textInput, {width: '60%'}]}
                            placeholderTextColor='#999999'
                        />

                        <TextInput
                            placeholder="oo.mm"
                            style={[inputStyle.textInput, {width: '30%'}]}
                            placeholderTextColor='#999999'
                        />
                    </View>
                </View>

                <View style={containerStyle.bottom}>
                    <TouchableOpacity style={buttonStyle.button}>
                        <Text style={buttonStyle.buttonText}>Generează</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default GenerateQRCode;