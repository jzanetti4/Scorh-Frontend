import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import {AuthNavigator} from './AuthNavigator'


/**
 * base Navigator to determine the order
 */
export default createAppContainer(
  createSwitchNavigator({

    Auth: AuthNavigator,
    Main: MainTabNavigator,
  })
);
