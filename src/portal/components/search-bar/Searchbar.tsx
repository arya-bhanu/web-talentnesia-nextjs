import React from 'react';
import SearchBarView from './SearchBar.view';
import { SearchBarViewProps } from './searchBar.type';

const SearchBar: React.FC<SearchBarViewProps> = ({
  placeHolder,
  className,
  onMouseIn,
  value,
  mouseValue,
  onMouseOut,
  onChangeInput
}) => {
  return <SearchBarView placeHolder={placeHolder} className={className} onMouseIn={onMouseIn} value={value} mouseValue={mouseValue} onMouseOut={onMouseOut} 
  onChangeInput={onChangeInput}/>;
};

export default SearchBar;
