import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MOLE, TIME } from '../constants';
import { addScore } from '../redux';

const Hole = (props) => {
  const [moleActive, setMoleActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const randomTime = Math.random() * TIME * 1000;
  let timerId;

  useEffect(() => {
    timerId = setInterval(() => {
      setMoleActive(true);
      setTimeout(() => {
        setMoleActive(false);
      }, 800);
    }, randomTime);
    setTimeout(endGame, TIME * 1000);
    return () => clearInterval(timerId);
  }, []);

  const endGame = () => {
    clearInterval(timerId);
    setIsGameOver(true);
  };

  return (
    <TouchableOpacity
      onPress={moleActive ? props.addScore : null}
      disabled={isGameOver}
    >
      <View style={styles.hole}>
        {moleActive && <Text style={styles.mole}>{MOLE}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hole: {
    flex: 1,
    minWidth: 80,
    minHeight: 80,
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mole: {
    fontSize: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    score: state.score,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addScore: () => dispatch(addScore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hole);
