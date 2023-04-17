import AsyncStorage from '@react-native-async-storage/async-storage';
import {Note} from '../screens/Editor/types';
import {Alert} from 'react-native';
import {useCallback} from 'react';

export function useNotesStore() {
  const storeNotes = async (value: Note[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@notes', jsonValue);
    } catch (e) {
      throw e;
    }
  };

  const getAllNotes = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@notes');
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (e) {
      Alert.alert('Erro ao recuperar todas as notas.');
    }
  }, []);

  const getNoteByIndex = async (noteIndex: number) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@notes');
      if (jsonValue !== null) {
        const parsedNotes = JSON.parse(jsonValue);

        return parsedNotes[noteIndex] as Note;
      }
      return null;
    } catch (e) {
      throw e;
    }
  };

  const saveNotes = async (newNote: Note, noteIndex?: number) => {
    const {title, note} = newNote;
    if (title !== '') {
      const jsonValue = await AsyncStorage.getItem('@notes');
      if (jsonValue !== null) {
        const parsedNotes = JSON.parse(jsonValue);

        const newNotes = [...parsedNotes];
        if (noteIndex || noteIndex === 0) {
          newNotes[noteIndex] = {title, note};
          await storeNotes(newNotes);
          return;
        }
        newNotes.push({title, note});
        await storeNotes(newNotes);
        return;
      }
    }
    if (note !== '') {
      Alert.alert('Por favor insira um título.');
      return;
    }
  };

  const deleteNote = async (noteIndex: number) => {
    const jsonValue = await AsyncStorage.getItem('@notes');
    if (jsonValue !== null) {
      const parsedNotes = JSON.parse(jsonValue);

      parsedNotes.splice(noteIndex, 1);

      storeNotes(parsedNotes);
      return parsedNotes;
    }
  };

  return {
    getAllNotes,
    getNoteByIndex,
    saveNotes,
    storeNotes,
    deleteNote,
  };
}
