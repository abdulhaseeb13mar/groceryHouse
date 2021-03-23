import Toast from 'react-native-root-toast';
import {colors} from './Theme';

export default (msg) => {
  Toast.show(msg, {
    backgroundColor: 'white',
    textColor: 'black',
    opacity: 0.96,
    position: -60,
    shadowColor: colors.secondary,
  });
};
