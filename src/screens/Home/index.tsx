import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {NavigateProps} from '../../routes';

export default function Home() {
  const navigation = useNavigation<NavigateProps>();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notas</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Editor')}>
          <Icon name="plus" size={24} color="#000" />
        </TouchableOpacity>
      </View>
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
