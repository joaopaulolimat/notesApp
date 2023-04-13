import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NavigateProps} from '../../routes';

export default function Editor() {
  const navigation = useNavigation<NavigateProps>();

  const [layoutHeight, setLayoutHeight] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const handleScrollContentLayout = (e: LayoutChangeEvent) => {
    const {height, width} = e.nativeEvent.layout;
    setLayoutHeight(height);
    setLayoutWidth(width);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        />
      </View>
      <View onLayout={handleScrollContentLayout} style={styles.notesContainer}>
        <TextInput
          multiline
          style={[
            styles.notes,
            {
              height: layoutHeight,
              width: layoutWidth,
            },
          ]}
        />
      </View>
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
});
