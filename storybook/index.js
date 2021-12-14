import React from 'react';
import { View } from 'react-native';
import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { registerRootComponent } from 'expo';

import { loadStories } from './storyLoader';
import './rn-addons';
import App from '../App';

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const Storybook = getStorybookUI({ asyncStorage: null });

addDecorator(story => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'center',
    }}
  >
    {story()}
  </View>
));

export default registerRootComponent(() => <App storybookUI={<Storybook />} />);
