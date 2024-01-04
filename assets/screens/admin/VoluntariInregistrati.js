import {containerStyle, imageStyle, paddingStyle, textStyle, buttonStyle} from "../../resorces/style";
import {Animated, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {MontserratFonts} from "../../resorces/MontserratFonts";
import {Dimensions} from "react-native";


const VoluntariInregistrati = ({navigation}) => {

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

    const screenHeight = Dimensions.get('window').height;

    const scroll = new Animated.Value(0);
    const headerHeight = scroll.interpolate({
        inputRange: [0, screenHeight * 0.4],
        outputRange: [screenHeight * 0.4, screenHeight * 0.15],
        extrapolate: 'clamp'
    });

    const Voluntar = ({nume, prenume, email, universitate, facultate, an, ore}) => (
        <View>
            <View style={paddingStyle.paddingTop20}/>

            <View style={[containerStyle.activity, {height: 160}]}>
                <View>
                    <Text style={textStyle.titleActivity}>{nume} {prenume}</Text>
                    <Text style={[textStyle.numePrenume, {fontSize: 16}]}>{email}</Text>
                    <Text style={[textStyle.numePrenume, {fontSize: 12, fontFamily: "MontserratItalic"}]}>{universitate}</Text>
                    <Text style={[textStyle.numePrenume, {fontSize: 12, fontFamily: "MontserratItalic"}]}>{facultate}</Text>
                    <Text style={[textStyle.numePrenume, {fontSize: 12, fontFamily: "MontserratItalic"}]}>Anul {an}</Text>
                    <View style={{paddingTop: 10}}/>
                    <Text style={[textStyle.numePrenume, {fontFamily: "MontserratSemiBold"}]}>Total ore: {ore}</Text>
                </View>
            </View>
        </View>
    );

    return(
        <SafeAreaView style={containerStyle.container}>

            <StatusBar translucent/>

            <Animated.View style={[containerStyle.topExtended, {backgroundColor: '#B4E4FF', height: headerHeight}]}>
                <Text style={textStyle.appName}>UniVolunteer</Text>
                <View style={{paddingTop: 60, paddingLeft: '5%'}}>
                    <Text style={textStyle.head}>Voluntari</Text>
                    <Text style={textStyle.head}>înregistrați</Text>
                    <Text style={textStyle.subHead}>Ai 65 de voluntari</Text>
                </View>
            </Animated.View>

            <ScrollView
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
                style={[containerStyle.middleExtended, {paddingTop: 20}]}
            >

                <Voluntar
                    nume="Nume"
                    prenume="Prenume"
                    email="email@gmail.com"
                    universitate="Universitatea Politehnica Timisoara"
                    facultate="Facultatea de Automatica si Calculatoare"
                    an="3"
                    ore="10"
                />

                <Voluntar
                    nume="Nume"
                    prenume="Prenume"
                    email="email@gmail.com"
                    universitate="Universitatea de Vest din Timisoara"
                    facultate="Facultatea de Matematica si Informatica"
                    an="1"
                    ore="24"
                />

                <View style={{height: 150, width: '100%'}}></View>
            </ScrollView>

            <View style={containerStyle.bottom}>
                <View style={containerStyle.menuBottom}>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/home.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/list.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/voluntari_bold.png")}/>
                    </TouchableOpacity>

                </View>
            </View>


        </SafeAreaView>
    )
};

export default VoluntariInregistrati;