import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import App from './App';
import {onScroll, onViewableItemsChnaged} from './utils';

jest.mock('./utils');
jest.useFakeTimers();

describe('FlatList', () => {
  it('scrolls', () => {
    const {getByTestId, getAllByTestId} = render(<App />);

    const listElement = getByTestId('MyFlatList');
    const listItems = getAllByTestId(/^id/);

    listItems.forEach((item, index) => {
      const y = index * 324;
      const height = index === 4 ? 300 : 324;

      fireEvent(item, 'layout', {
        nativeEvent: {
          layout: {height, y},
        },
      });
    });

    fireEvent(listElement, 'layout', {
      nativeEvent: {
        layout: {height: 844},
      },
    });

    jest.advanceTimersByTime(100);

    const eventData = {
      nativeEvent: {
        contentOffset: {y: 500},
        contentSize: {
          height: 1596,
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

    expect(onScroll).toBeCalledTimes(3);
    expect(onViewableItemsChnaged).toBeCalledTimes(2);
  });
});
