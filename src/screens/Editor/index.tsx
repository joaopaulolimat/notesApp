import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  LayoutChangeEvent,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigateProps} from '../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomModal} from '../../components';
import {Note} from './types';

export default function Editor() {
  const navigation = useNavigation<NavigateProps>();
  const route = useRoute();
  const {noteIndex} = route.params;

  const [layoutHeight, setLayoutHeight] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Note[] | []>([]);

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@notes');
        return jsonValue != null ? setNotes(JSON.parse(jsonValue)) : null;
      } catch (e) {
        setModalText('Erro ao carregar nota');
        setModalVisible(true);
      }
    })();
  }, []);

  const handleScrollContentLayout = (e: LayoutChangeEvent) => {
    const {height, width} = e.nativeEvent.layout;
    setLayoutHeight(height);
    setLayoutWidth(width);
  };

  const storeData = async (value: Note[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@notes', jsonValue);
    } catch (e) {
      setModalText('Erro ao salvar nota');
      setModalVisible(true);
    }
  };

  const goBackAndSaveNote = () => {
    if (title !== '') {
      const newNotes = [...notes];
      newNotes.push({title, note});
      storeData(newNotes);
      navigation.goBack();
      return;
    }
    if (note !== '') {
      Alert.alert('Por favor insira um título.');
      return;
    }
    navigation.goBack();
  };

  const onChangeTitle = (text: string) => {
    setTitle(text);
  };

  const onChangeNote = (text: string) => {
    setNote(text);
  };

  const modalButtonAction = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={goBackAndSaveNote}>
          <Icon
            name="arrow-left"
            size={24}
            color="#ad8b11"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <TextInput
          autoFocus
          placeholder="Título"
          placeholderTextColor="#ad8b11"
          style={styles.title}
          onChangeText={onChangeTitle}
        />
      </View>
      <View onLayout={handleScrollContentLayout} style={styles.notesContainer}>
        <TextInput
          multiline
          onChangeText={onChangeNote}
          style={[
            styles.notes,
            {
              height: layoutHeight,
              width: layoutWidth,
            },
          ]}
        />
      </View>
      <CustomModal
        visible={modalVisible}
        buttonAction={modalButtonAction}
        modalTitle={modalText}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: '#e8d48e',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {paddingRight: 24},
  title: {fontSize: 18},
  notesContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ebdeb2',
  },
  notes: {
    flex: 1,
  },
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
  alertIcon: {
    margin: 8,
    backgroundColor: 'yellow',
    borderRadius: 25,
    padding: 8,
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
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  modalText: {
    textAlign: 'center',
  },
});
