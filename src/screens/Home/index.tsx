import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {NavigateProps} from '../../routes';

import {CustomModal} from '../../components';
import {useNotesStore} from '../../hooks/useNotesStore';
import {Note} from '../Editor/types';

export default function Home() {
  const navigation = useNavigation<NavigateProps>();
  const {deleteNote, getAllNotes} = useNotesStore();

  const [notes, setNotes] = useState<Note[] | []>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const modalButtonAction = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    (async () => {
      const allNotes = await getAllNotes();
      console.log({allNotes});
      setNotes(allNotes);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notas</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Editor', {})}>
          <Icon name="plus" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Editor', {noteIndex: index});
                }}>
                <Text>{item.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  setNotes(await deleteNote(index));
                }}>
                <Text>excluir</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <CustomModal
        visible={modalVisible}
        buttonAction={modalButtonAction}
        modalTitle="Erro ao carregar notas"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    flexDirection: 'row',
  },
  titleContainer: {flexGrow: 1},
  title: {fontSize: 18},
});
