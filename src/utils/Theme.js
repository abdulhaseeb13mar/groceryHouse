import {Dimensions, Platform} from 'react-native';

export const colors = {
  primary: '#229d56',
  secondary: '#ffffff',
  background: '#f9fffc',
  button: '#ff5016',
  darkBackground: '#1d1d1d',
  lightBackground: '#e6dfdf',
  grey: '#a3a3a3',
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const metrics = {
  width: width,
  height: height,
  defaultMargin: Dimensions.get('window').width * 0.05,
  smallMargin: width * 0.03,
  largeMargin: width * 0.08,
};

export const fonts = {
  primary: Platform.select({
    android:'Arial',
    ios:'Arial'
  }),
  primaryBold: Platform.select({
    android:'Arial',
    ios:'Arial'
  }),
  secondary: Platform.select({
    android:'Arial',
    ios:'Arial'
  }),
  secondaryBold: Platform.select({
    android:'Arial',
    ios:'Arial'
  }),
}
