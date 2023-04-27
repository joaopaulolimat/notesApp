import React, {useCallback, useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {NavigateProps} from '../../routes';

import {CustomModal} from '../../components';
import {useNotesStore} from '../../hooks/useNotesStore';
import {Note} from '../Editor/types';
import {LayoutChangeEvent} from 'react-native';

export default function Home() {
  const navigation = useNavigation<NavigateProps>();
  const {deleteNote, getAllNotes} = useNotesStore();

  const [notes, setNotes] = useState<Note[] | []>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewHeight, setViewHeight] = useState(0);

  const deviceH = Dimensions.get('screen').height;
  const windowH = Dimensions.get('window').height;
  const bottomNavBarH = deviceH - windowH;
  const statusBarHeight = StatusBar.currentHeight || 24;

  const modalButtonAction = () => {
    setModalVisible(!modalVisible);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const allNotes = await getAllNotes();
        setNotes(allNotes);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <SafeAreaView>
      <View
        style={styles.container}
        onLayout={(e: LayoutChangeEvent) => {
          setViewHeight(e.nativeEvent.layout.height);
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notas</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Editor', {})}>
          <Icon name="plus" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: deviceH - viewHeight - bottomNavBarH - statusBarHeight,
        }}>
        <FlatList
          data={notes}
          renderItem={({item, index}) => {
            return (
              <View style={styles.noteContainer}>
                <View style={styles.noteButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Editor', {noteIndex: index});
                    }}>
                    <Text style={styles.noteTitle}>{item.title}</Text>
                    {item.note !== '' && (
                      <Text numberOfLines={1} style={styles.noteContent}>
                        {item.note}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      setNotes(await deleteNote(index));
                    }}>
                    <Icon name="trash-2" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
                <View style={styles.divider} />
              </View>
            );
          }}
        />
      </View>
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
  noteContainer: {padding: 16},
  noteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  noteTitle: {color: '#000'},
  noteContent: {color: '#949494', overflow: 'scroll'},
  divider: {
    backgroundColor: '#949494',
    height: 1,
    flex: 1,
  },
});
