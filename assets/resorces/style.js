import { StyleSheet } from 'react-native';

export const paddingStyle = StyleSheet.create({
    paddingTop20: {
        paddingTop: 20
    },

    paddingLeft5: {
        paddingLeft: '5%'
    },

    paddingTop10: {
        paddingTop: 10
    },
});

export const inputStyle = StyleSheet.create({
    textInput: {
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        paddingLeft: 20,
    },
});

export const buttonStyle = StyleSheet.create({
    button: {
        width: 200,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: 'white',
        fontFamily: 'MontserratLight',
        fontSize: 18
    },

    buttonMenu: {
        borderWidth: 2,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },

    buttonMenuText: {
        fontFamily: "MontserratLight",
        fontSize: 15
    },
});

export const imageStyle = StyleSheet.create({
    imageMenu: {
        width: 50,
        height: 50
    },

    imageMenuBottom: {
        width: 25,
        height: 25
    },

    imageBack: {
        height: 45,
        width: 45,
    },

    imageAdd: {
        height: 60,
        width: 60
    },

    imageStatusActivity: {
        //aspectRatio: 1,
        height: 30,
        width: 30
    }
});

export const errorStyle = StyleSheet.create({
    errorText: {
        fontSize: 12,
        fontFamily: "MontserratRegular",
        color: 'red',
        marginLeft: 5
    },

    errorContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        //marginLeft: '5%'
    },

    errorImage: {
        width: 20,
        height: 20
    },
});

export const textStyle = StyleSheet.create({

    uniVolunteer: {
        fontSize: 20,
        fontFamily: 'MontserratRegular',
    },

    uniVolunteerTextLogin: {
        color: 'black',
        fontFamily: 'MontserratBold',
        fontSize: 25
    },

    appName: {
        paddingTop: 50,
        fontSize: 20,
        fontFamily: 'MontserratMedium',
        alignSelf: 'center',
        color: 'black'
    },

    head: {
        fontFamily: 'MontserratBold',
        fontSize: 40
    },

    subHead: {
        fontFamily: 'MontserratLight',
        fontSize: 21,
        paddingTop: 20
    },

    detail: {
        fontFamily: "MontserratRegular",
        fontSize: 13,
        marginLeft: 20
    },

    titleActivity: {
        fontSize: 22,
        fontFamily: "MontserratSemiBold"
    },

    hoursActivity: {
        fontSize: 12,
        fontFamily: "MontserratLight"
    }
});

export const containerStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    menuBottom: {
        width:'55%',
        height: 30,
        backgroundColor:'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    topExtended: {
        width: '100%',
        height: '40%',
        backgroundColor: '#F7C8E0',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },

    topReduced: {
        backgroundColor: '#F7C8E0',
        width: '100%',
        height: '15%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingTop: 40,
        paddingLeft: '5%',
    },

    topContainer: {
        width: '90%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    middleReduced: {
        height: '50%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    middleExtended: {
        height: '75%',
        backgroundColor: 'white',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: 40
    },

    bottom: {
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

    activity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 25,
        borderWidth: 2,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        height: 75
    }
});