import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Editor: undefined;
};

export type NavigateProps = StackNavigationProp<RootStackParamList>;
