import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {NavigateProps} from '../../routes';

export default function Home() {
  const navigation = useNavigation<NavigateProps>();
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          padding: 16,
          flexDirection: 'row',
        }}>
        <View style={{flexGrow: 1}}>
          <Text style={{fontSize: 32}}>Notas</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Editor')}>
          <Icon name="plus" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
