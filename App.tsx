import React, {useCallback, useRef} from 'react';
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

type DataItem = {id: string; text: string};

const data: DataItem[] = [
  {id: 'id1', text: 'Lorem ipusm'},
  {id: 'id2', text: 'Hello world'},
  {id: 'id3', text: 'Cacio e pepe'},
  {id: 'id4', text: 'Phanaeng curry'},
  {id: 'id5', text: 'Quarter pounder'},
];

function App(): JSX.Element {
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 1,
  });

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      console.log('--- scroll');
    },
    [],
  );

  const handleViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
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
      <View key={item.id} style={styles.listItem}>
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
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={handleViewableItemsChanged}
        getItemLayout={() => ({length: 300, offset: 30, index: 0})}
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
