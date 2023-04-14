import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';

export default function CustomModal({
  modalTitle,
  visible,
  buttonAction,
}: {
  modalTitle: string;
  visible: boolean;
  buttonAction: () => void;
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalText}>{modalTitle}</Text>
          </View>

          <TouchableOpacity onPress={buttonAction}>
            <Text style={styles.textStyle}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 18,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textStyle: {
    color: '#000',
    textAlign: 'center',
    textDecorationLine: 'underline',
    margin: 12,
  },
  modalText: {
    textAlign: 'center',
  },
});
