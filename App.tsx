import React, {useCallback} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import {onScroll, onViewableItemsChnaged} from './utils';

type DataItem = {id: string; text: string};

const data: DataItem[] = [
  {id: 'id1', text: 'Lorem ipusm'},
  {id: 'id2', text: 'Hello world'},
  {id: 'id3', text: 'Cacio e pepe'},
  {id: 'id4', text: 'Phanaeng curry'},
  {id: 'id5', text: 'Quarter pounder'},
];

function App(): JSX.Element {
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScroll();

      console.log('--- scroll');
    },
    [],
  );

  const handleViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      onViewableItemsChnaged();

      console.log(
        '--- viewable items changed',
        viewableItems.map(({item}) => item.id),
      );
    },
    [],
  );

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderItem = ({item}: {item: DataItem}) => {
    return (
      <View testID={item.id} key={item.id} style={styles.listItem}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  const keyExtractor = (item: DataItem) => item.id;

  return (
    <SafeAreaView style={styles.container} testID="MySafeAreaView">
      <FlatList
        testID="MyFlatList"
        ItemSeparatorComponent={renderItemSeparator}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={handleScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    height: 300,
    paddingHorizontal: 24,
    backgroundColor: 'lightgray',
  },
  itemSeparator: {
    height: 24,
  },
});

export default App;
