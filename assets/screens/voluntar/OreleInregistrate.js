import {containerStyle, imageStyle, paddingStyle, textStyle} from "../../resorces/style";
import {Animated, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {MontserratFonts} from "../../resorces/MontserratFonts";
import {Dimensions} from "react-native";


const OreleInregistrate = ({navigation}) => {

    const [fontsLoaded] = MontserratFonts();
    if (!fontsLoaded) return undefined;

    const screenHeight = Dimensions.get('window').height;

    const scroll = new Animated.Value(0);
    const headerHeight = scroll.interpolate({
        inputRange: [0, screenHeight * 0.4],
        outputRange: [screenHeight * 0.4, screenHeight * 0.15],
        extrapolate: 'clamp'
    });

    const ActivityItem = ({title, hours, statusImage}) => (
        <View>
            <View style={paddingStyle.paddingTop20}/>

            <View style={containerStyle.activity}>
                <View>
                    <Text style={textStyle.titleActivity}>{title}</Text>
                    <Text style={textStyle.hoursActivity}>{hours}</Text>
                </View>

                <Image style={imageStyle.imageStatusActivity} source={statusImage}/>
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

                <ActivityItem title="Titlu" hours="oo.mm zz.ll.aaaa - oo.mm zz.ll.aaaa" statusImage={require('../../images/waiting-yellow.png')} />
                <ActivityItem title="Titlu" hours="oo.mm zz.ll.aaaa - oo.mm zz.ll.aaaa" statusImage={require('../../images/declined-red.png')} />
                <ActivityItem title="Titlu" hours="oo.mm zz.ll.aaaa - oo.mm zz.ll.aaaa" statusImage={require('../../images/approved-green.png')} />

                <View style={{height: 150, width: '100%'}}></View>
            </ScrollView>

            <View style={{width: '100%', alignItems: 'center', position: 'absolute', bottom: '12%'}}>
                <TouchableOpacity>
                    <Image style={imageStyle.imageAdd} source={require("../../images/add-bold.png")}/>
                </TouchableOpacity>
            </View>

            <View style={containerStyle.bottom}>
                <View style={containerStyle.menuBottom}>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/home.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/list_bold.png")}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={imageStyle.imageMenuBottom} source={require("../../images/user.png")}/>
                    </TouchableOpacity>

                </View>
            </View>


        </SafeAreaView>
    )
};

export default OreleInregistrate;