/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SpinWheel from '../components/SpinWheel';

const HomeScreen = (props: any) => {
  const [credit, setCredit] = useState(1000);
  const [numbers, setNumbers] = useState([
    {num: 1, value: 0},
    {num: 2, value: 0},
    {num: 3, value: 0},
    {num: 4, value: 0},
    {num: 5, value: 0},
    {num: 6, value: 0},
    {num: 7, value: 0},
    {num: 8, value: 0},
    {num: 9, value: 0},
    {num: 10, value: 0},
    {num: 11, value: 0},
    {num: 12, value: 0},
  ]);

  const [betcoin, setBetcoin] = useState(0);

  //set time
  const [time, setTime] = React.useState(10);
  const timerRef = React.useRef(time);

  //game over
  const [showModal, setShowModal] = useState(false);
  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
      if (timerRef.current === 0) {
        console.log('finesg gME');
        setShowModal(true);
        ToastAndroid.show('game over', ToastAndroid.SHORT);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  console.log(time, 'time');

  const BetHandler = data => {
    if (betcoin === 0) {
      ToastAndroid.show('Pl select bet coin', ToastAndroid.SHORT);
      console.log('select coin');
    } else {
      if (credit > 0) {
        let newData = numbers.map(item => {
          if (item.num === data.num) {
            item.value += betcoin;
            setCredit(credit - item.value);
          }
          return item;
        });

        setNumbers(newData);
      } else {
        console.log('credit over');
        ToastAndroid.show('credit over', ToastAndroid.SHORT);
      }
    }
  };

  const BetcoinHandler = data => {
    setBetcoin(data);
  };

  const startGame = () => {
    setShowModal(false);
    setBetcoin(0);
  };

  const OverModal = () => {
    return (
      <Modal
        transparent={true}
        visible={showModal}
        style={{backgroundColor: '#000009'}}>
        <View
          style={{
            backgroundColor: 'grey',
            alignSelf: 'center',
            marginTop: '50%',
            width: '50%',
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 24}}>Game Over</Text>
          <TouchableOpacity
            onPress={() => startGame()}
            style={{
              width: '80%',
              height: 48,
              backgroundColor: 'pink',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: '10%',
            }}>
            <Text>Try Again</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <OverModal />
      {/* <SpinWheel /> */}
      <View
        style={{
          borderWidth: 1,
          width: '100%',
          padding: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            backgroundColor: 'green',
            width: 50,
            height: 50,
            borderRadius: 50,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{time}</Text>
        </View>

        <Text onPress={() => setTime(10)}>start</Text>

        <View>
          <Text style={{fontSize: 20, fontWeight: '600'}}>
            Credit : {credit}
          </Text>
        </View>
      </View>
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          numColumns={3}
          data={numbers}
          renderItem={item => {
            return (
              <TouchableOpacity
                onPress={() => BetHandler(item.item, betcoin)}
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  height: 120,
                  width: 120,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 3,
                  alignSelf: 'center',
                  backgroundColor: '#885599',
                }}>
                <Text style={{fontSize: 18, color: '#FFFFFF'}}>
                  {item.item.num}
                </Text>
                <Text>Rs{item.item.value}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => BetcoinHandler(50)}
          style={[styles.betCoinStyle, {backgroundColor: 'red'}]}>
          <Text>50</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => BetcoinHandler(100)}
          style={[styles.betCoinStyle, {backgroundColor: 'green'}]}>
          <Text>100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => BetcoinHandler(200)}
          style={[styles.betCoinStyle, {backgroundColor: 'yellow'}]}>
          <Text>200</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => BetcoinHandler(500)}
          style={[styles.betCoinStyle, {backgroundColor: 'brown'}]}>
          <Text>500</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  betCoinStyle: {
    padding: '6%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
