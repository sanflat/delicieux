import { extendTheme } from 'native-base';

// 基本色の定義
const baseColors = {
  deepBlue: '#0F0B21',
  gainsboro: '#f1f5f7',
  offWhite: '#F8FAFB',
  turquoiseBlue: '#00bac7',
  darkGray: '#1f1f1f',
  redOrange: '#ff4c4c',
};

const colors = {
  light: {    
    text: {
      primary: baseColors.deepBlue,
      secondary: `${baseColors.deepBlue}80`,
      background: baseColors.offWhite,
      placeholder: `${baseColors.deepBlue}80`,
      border: `${baseColors.deepBlue}20`,
      link: baseColors.turquoiseBlue,
    },
    navigation: {
      activeIcon: baseColors.deepBlue,
      inactiveIcon: baseColors.turquoiseBlue,
      background: baseColors.offWhite,
    },
    button: {
      text: baseColors.deepBlue,
      background: baseColors.offWhite,
      border: baseColors.deepBlue,
    },
    icon: {
      primary: baseColors.darkGray,
      secondary: baseColors.offWhite,
    },
    display: {
      background: baseColors.offWhite,
    },
    status: {
      danger: baseColors.redOrange,
      spinner: baseColors.turquoiseBlue,
    },
  },
  dark: {
    text: {       
      primary: baseColors.gainsboro,
      secondary: `${baseColors.gainsboro}80`,
      background: baseColors.darkGray,
      placeholder: `${baseColors.gainsboro}80`,
      border: `${baseColors.gainsboro}20`,
      link: baseColors.turquoiseBlue,
    },
    navigation: {
      activeIcon: baseColors.offWhite,
      inactiveIcon: `${baseColors.gainsboro}80`,
      background: baseColors.darkGray,
    },
    button: {
      text: baseColors.offWhite,
      background: baseColors.darkGray,
      border: `${baseColors.gainsboro}20`,
    },
    icon: {
      primary: baseColors.gainsboro,
      secondary: baseColors.darkGray,
    },
    display: {
      background: baseColors.darkGray,
    },
    status: {
      danger: baseColors.redOrange,
      spinner: baseColors.turquoiseBlue,
    },
  }
};

export default extendTheme({ colors });
