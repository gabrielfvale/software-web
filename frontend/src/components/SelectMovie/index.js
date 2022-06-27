import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import React from 'react';

const movies = [
  {
    label: 'Morbius',
    id: 526896,
    backdrop_path: '/kmCBLNHsNnlDEtghSaF2nabpG2T.jpg',
    poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
    title: 'Morbius',
    tagline: 'A new Marvel legend arrives.',
    overview:
      'Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.',
  },
  {
    id: 526896,
    backdrop_path: '/kmCBLNHsNnlDEtghSaF2nabpG2T.jpg',
    poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
    title: 'Morbius',
    tagline: 'A new Marvel legend arrives.',
    overview:
      'Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.',
  },
  {
    id: 526896,
    backdrop_path: '/kmCBLNHsNnlDEtghSaF2nabpG2T.jpg',
    poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
    title: 'Morbius',
    tagline: 'A new Marvel legend arrives.',
    overview:
      'Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.',
  },
];

const SelectMovie = () => {
  const [pickerItems, setPickerItems] = React.useState(movies);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleCreateItem = item => {
    setPickerItems(curr => [...curr, item]);
    setSelectedItems(curr => [...curr, item]);
  };

  const handleSelectedItemsChange = selectedItems => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };
  return (
    <CUIAutoComplete
      fontSize="xs"
      label="Choose preferred work locations"
      placeholder="Type a Movie"
      onCreateItem={handleCreateItem}
      items={pickerItems}
      selectedItems={selectedItems}
      onSelectedItemsChange={changes =>
        handleSelectedItemsChange(changes.selectedItems)
      }
    />
  );
};

export default SelectMovie;
