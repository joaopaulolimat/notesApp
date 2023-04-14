import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Editor: {
    noteIndex?: number;
  };
};

export type NavigateProps = StackNavigationProp<RootStackParamList>;
