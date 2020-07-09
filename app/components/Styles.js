import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  header: {
    padding: 5,
    backgroundColor: '#F67849',
  },
  title: {
    color: '#FFF',
    fontSize: 25,
    textAlign: 'center',
  },
  sellerItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sellerItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sellerItemText: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
  searchBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  searchIcon: {
    flex: 0.1,
    paddingTop: 15,
  },
  searchText: {
    flex: 1,
    fontSize: 20,
  },
});

export default Styles;
