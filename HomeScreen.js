import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image, Modal, Animated, Dimensions
} from 'react-native';
import { Audio } from 'expo-av';

export default function HomeScreen({ userName }) {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [sound, setSound] = useState();
  const [popupVisible, setPopupVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const accountNumber = Math.floor(10000000 + Math.random() * 90000000);
  const sortCode = `${Math.floor(10 + Math.random() * 90)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(10 + Math.random() * 90)}`;

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/applepay.wav')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.log('Sound error:', err);
    }
  };

  const playPopup = () => {
    setPopupVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setPopupVisible(false));
      }, 800);
    });
  };

  const handleSteal = async () => {
    const now = new Date();
    const newTransaction = {
      id: Date.now().toString(),
      amount,
      account: Math.floor(100000000 + Math.random() * 900000000),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(balance + amount);
    setAmount(amount * 2);

    await playSound();
    playPopup();
  };

  const formatNumber = (num) => {
    return num.toLocaleString('en-UK');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo1.png')} style={styles.logo} />

      <View style={styles.accountBox}>
        <View style={styles.accountHeader}>
          <Text style={styles.nameText}>{userName.first} {userName.last}</Text>
        </View>
        <Text style={styles.accountDetail}>Account Number: {accountNumber}</Text>
        <Text style={styles.accountDetail}>Sort Code: {sortCode}</Text>
        <View style={styles.balanceWrapper}>
          <Text style={styles.balanceText}>£{formatNumber(balance)}</Text>
        </View>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.transactionHeader}>Transaction History</Text>}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text style={styles.transactionText}>+ £{formatNumber(item.amount)} from anonymous user</Text>
            <Text style={styles.transactionSubText}>Acct: {item.account}</Text>
            <Text style={styles.transactionSubText}>{item.date} | {item.time}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={handleSteal} style={styles.stealButton}>
        <Text style={styles.stealText}>Steal</Text>
      </TouchableOpacity>

      <Modal transparent visible={popupVisible}>
        <View style={styles.popupContainer}>
          <Animated.View style={[styles.popupBox, { opacity: fadeAnim }]}>
            <Image source={require('../assets/logo1.png')} style={styles.popupLogo} />
            <Text style={styles.popupText}>Transaction Complete</Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  accountBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    minHeight: 120,
    justifyContent: 'flex-start',
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  nameText: {
    fontSize: 18,
    color: 'black',
  },
  accountDetail: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 2,
  },
  balanceWrapper: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  transactionHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  transaction: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  transactionText: {
    color: 'black',
    fontSize: 16,
  },
  transactionSubText: {
    color: 'gray',
    fontSize: 12,
  },
  stealButton: {
    width: screenWidth - 40,
    backgroundColor: 'red',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },
  stealText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  popupLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});



