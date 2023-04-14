import React, {useCallback, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Note} from '../Editor/types';

export default function Home() {
  const navigation = useNavigation<NavigateProps>();
  const [notes, setNotes] = useState<Note[] | []>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@notes');
          console.log({jsonValue});
          return jsonValue != null ? setNotes(JSON.parse(jsonValue)) : null;
        } catch (e) {
          setModalVisible(true);
        }
      })();
    }, []),
  );

  const modalButtonAction = () => {
    setModalVisible(!modalVisible);
  };

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
        renderItem={({item}) => {
          console.log(item);
          return <Text>{item.title}</Text>;
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
