import React from 'react';
import SearchBarView from './SearchBar.view';
import { SearchBarViewProps } from './searchBar.type';

const SearchBar: React.FC<SearchBarViewProps> = ({
  placeHolder,
  className,
}) => {
  return <SearchBarView placeHolder={placeHolder} className={className} />;
};

export default SearchBar;
