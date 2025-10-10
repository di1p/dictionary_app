import React from 'react';
import App from '../../App';
import { NavigationIndependentTree } from '@react-navigation/native';

export default function Index() {
  return (
    <NavigationIndependentTree>
      <App />
    </NavigationIndependentTree>
  );
}
