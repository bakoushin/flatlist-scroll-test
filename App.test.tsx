import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import App from './App';

describe('FlatList', () => {
  it('scrolls', () => {
    const {getByTestId} = render(<App />);

    const listElement = getByTestId('MyFlatList');

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 2000,
          width: 390,
        },
        layoutMeasurement: {
          height: 844,
          width: 390,
        },
      },
    };
    fireEvent.scroll(listElement, eventData);
    fireEvent.scroll(listElement, {
      ...eventData,
      contentOffset: {y: 0},
    });
    fireEvent.scroll(listElement, {
      ...eventData,
      contentOffset: {y: 800},
    });
  });
});