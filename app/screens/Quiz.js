/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import {COLORS, SIZES} from '../constants';
import data from '../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Quiz = () => {
  const [textQuestions, setTextQuestions] = useState(3);

  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [currentTextQuestions, setCurrentTextQuestions] = useState(null);
  //   const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [answer, setAnswer] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const validateAnswer = selectedOption => {
    // let correct_option = allQuestions[currentQuestionIndex].correct_option;
    setCurrentOptionSelected(selectedOption);
    setCurrentTextQuestions(selectedOption);
    // setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption) {
      // Set Score
      setAnswer(answer + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      //   setTextQuestions(currentQuestionIndex + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      //   setCurrentTextQuestions(null);
      //   setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setAnswer(0);
    setCurrentOptionSelected(null);
    setCurrentTextQuestions(null);
    // setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}>
        {/* Question Counter */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}>
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: COLORS.white,
            fontSize: 30,
          }}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderTextInput = () => {
    const [text, onChangeText] = useState('');
    return (
      <View>
        <TextInput
          onTouchStart={() => setShowNextButton(true)}
          style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.options.map(option => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == currentQuestionIndex
                  ? COLORS.success
                  : option == currentOptionSelected
                  ? COLORS.success
                  : COLORS.secondary + '40',
              backgroundColor:
                option == currentQuestionIndex
                  ? COLORS.success + '20'
                  : option == currentOptionSelected
                  ? COLORS.success + '20'
                  : COLORS.secondary + '20',
              height: 60,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
            {option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.success,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="check"
                  style={{
                    color: COLORS.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: '100%',
            backgroundColor: COLORS.accent,
            padding: 20,
            borderRadius: 5,
          }}>
          <Text
            style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: '#00000020',
        }}>
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          position: 'relative',
        }}>
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Question */}
        {renderQuestion()}
        {/* <View>
          {(textQuestions == allQuestions.length) < 3
            ? renderOptions()
            : renderTextInput()}
        </View> */}
        {/* TextInput */}
        {renderTextInput()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                width: '90%',
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                {answer > allQuestions.length / 2 ? 'Thank you!' : 'Oops!'}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color:
                      answer > allQuestions.length / 2
                        ? COLORS.success
                        : COLORS.error,
                  }}>
                  {answer}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.black,
                  }}>
                  / {allQuestions.length}
                </Text>
              </View>
              {/* Retry Quiz button */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: COLORS.accent,
                  padding: 20,
                  width: '100%',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.white,
                    fontSize: 20,
                  }}>
                  Retry Survey
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Background Image */}
        <Image
          source={require('../assets/images/DottedBG.png')}
          style={{
            width: SIZES.width,
            height: 130,
            zIndex: -1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.5,
          }}
          resizeMode={'contain'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Quiz;
