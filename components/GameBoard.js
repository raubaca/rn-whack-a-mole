import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { TIME } from '../constants';
import Hole from './Hole';

export const GameBoard = (props) => {
  const [timeLeft, setTimeLeft] = useState(TIME);

  useEffect(() => {
    if (!timeLeft) return;
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text>Rau's Whack-a-mole App</Text>
      <Text>{timeLeft}</Text>
      <Text>{props.score}</Text>
      <View style={styles.game}>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
        <Hole></Hole>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  game: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 400,
    marginTop: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    score: state.score,
  };
};

export default connect(mapStateToProps)(GameBoard);
