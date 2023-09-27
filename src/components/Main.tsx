import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Main() {
    const navigation = useNavigation();

    const pinLock = '1234';

    const [lockArray, setLockArray] = useState<number[]>([]);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [attemptCount, setAttemptCount] = useState(3);
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);

    const letters = [
        {
            id: 1,
            title: '',
        },

        {
            id: 2,
            title: '',
        },

        {
            id: 3,
            title: '',
        },

        {
            id: 4,
            title: '',
        },

        {
            id: 5,
            title: '',
        },

        {
            id: 6,
            title: '',
        },

        {
            id: 7,
            title: '',
        },

        {
            id: 8,
            title: '',
        },

        {
            id: 9,
            title: '',
        },
        {
            id: 'home',
            title: '',
            ImageSource: require('../../assets/images/home.png'),

        },
        {
            id: 0,
            title: '',
        },
        {
            id: 'remove',
            title: '',
            ImageSource: require('../../assets/images/deleteB.png'),
        },


    ];

    const numColumns = 3;





    const pinReset = () => {
        setLockArray([]);
        setIsUnlocked(false);
    };

    const clickHome = () => {
        Alert.alert(lockArray.join(''));
    };

    const pinDelete = () => {
        if (lockArray.length > 0) {
            const newLockArray = [...lockArray];
            newLockArray.pop();
            setLockArray(newLockArray);
        }
    };

    useEffect(() => {
        if (attemptCount === 0) {
            setIsDisabled(true);
            const timer = setInterval(() => {
                setCountdown((countdown) => {
                    if (countdown > 0) {
                        return countdown - 1;
                    } else {
                        clearInterval(timer);
                        setAttemptCount(3);
                        setIsDisabled(false);
                        return 60; // Reset the countdown
                    }
                });
            }, 1000); // Update countdown every second
            return () => clearInterval(timer);
        }
    }, [attemptCount]);

    if (lockArray.length === 4) {
        if (lockArray.join('') === pinLock) {
            setIsUnlocked(true);
            Alert.alert('Unlocked');
            setAttemptCount(3);
            pinReset();
            navigation.navigate('Home');
        } else {
            if (attemptCount > 1) {
                setAttemptCount(attemptCount - 1);
            } else {
                setAttemptCount(0);
            }
            pinReset();
        }
    }

    const clickButton = (number: number) => {
        if (lockArray.length < 4) {
            const newLockArray = [...lockArray, number];
            setLockArray(newLockArray);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={styles.topicView}>
                    <Text style={styles.topicText}> Enter Passcode </Text>
                </View>

                <View style={styles.inputPinCodeView}>
                    {lockArray.map((_, index) => (
                        <View key={index} style={styles.pinCodeFieldFilled} />
                    ))}
                    {Array.from({ length: 4 - lockArray.length }).map((_, index) => (
                        <View key={index} style={styles.pinCodeField} />
                    ))}
                </View>
                <View style={styles.errorView}>
                    {attemptCount < 3 && !isDisabled && (
                        <Text style={styles.errorTxt}>
                            You have {attemptCount} attempts left{' '}
                        </Text>
                    )}
                    {isDisabled && (
                        <Text style={styles.errorTxt}>
                            Try again in {countdown} seconds
                        </Text>
                    )}
                </View>
                <View style={styles.numbersView}>
                    <FlatList
                        data={letters}
                        numColumns={numColumns}
                        contentContainerStyle={styles.flatListContainer}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                disabled={isDisabled}
                                onPress={() => {
                                    if (item.id === 'remove') {
                                        pinDelete();
                                    } else if (item.id === 'home') {
                                        // Handle the "Delete" button click
                                    } else {
                                        clickButton(item.id);
                                    }
                                }}
                                style={[
                                    styles.numberPlate,
                                    item.id === 'remove' || item.id === 'home'
                                        ? { borderWidth: 0, backgroundColor: 'transparent' } // Remove border and background
                                        : null,
                                ]}
                            >
                                {item.ImageSource && (
                                    <Image
                                        style={styles.buttonImage}
                                        source={item.ImageSource}
                                        resizeMode="contain"
                                    />
                                )}
                                {!item.ImageSource && <Text style={styles.number}>{item.id}</Text>}
                            </TouchableOpacity>
                        )}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    textButton: {

        textAlign: 'center',
    },
    topicText: {
        fontSize: 30,
        color: '#5A7FD6',
        marginTop: 140,
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        fontFamily: 'Roboto-Regular',

    },
    topicView: {
        flex: 2,
        width: '100%',
        backgroundColor: '#FAFAFA',
        marginBottom: 0,

    },
    errorView: {
        height: 70,
        width: '100%',
        backgroundColor: '#FAFAFA',
        marginBottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    errorTxt: {
        fontSize: 22,
        color: 'red',
    },
    inputPinCodeView: {
        width: '100%',
        height: 30,
        backgroundColor: '#FAFAFA',
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pinCodeField: {
        width: 15,
        height: 15,
        backgroundColor: '#FAFAFA',
        marginLeft: 10,
        marginRight: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#5A7FD6',
        elevation: 3,
    },
    numbersView: {
        width: '100%',
        flex: 5,
        backgroundColor: '#FAFAFA',
        marginTop: 0,
        flexDirection: 'column',
    },
    numericalLane: {
        width: '100%',
        height: 75,
        backgroundColor: '#FAFAFA',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pinCodeFieldFilled: {
        width: 15,
        height: 15,
        backgroundColor: '#5A7FD6',
        marginLeft: 10,
        marginRight: 15,
        borderRadius: 10,


    },
    okButton: {
        width: 60,
        height: 60,
        backgroundColor: '#FAFAFA',
        marginLeft: 10,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },

    buttonImage: {

        tintColor: '#5A7FD6',
    },
    buttonOk: {
        fontSize: 22,
        color: '#5A7FD6',
    },


    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 150,

    },

    flatListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    numberPlate: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 100,
        height: 60,
        width: 60,
        marginHorizontal: 20,
        marginVertical: 15,
        marginTop: 30,
        borderColor: '#5A7FD6',
        backgroundColor: '#FAFAFA',

    },

    number: {
        fontSize: 35,
        color: '#5A7FD6',
        fontWeight: 'bold',
    },


    // countView: {
    //   fontSize: 15,
    //   color: 'red'
    // },
});

export default Main;
