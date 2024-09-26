import React from 'react';
import SearchBarCourseView from './searchBarCourse.view';
import { SearchBarCourseViewProps } from './searchBarCourse.type';

const SearchBarCourse: React.FC<SearchBarCourseViewProps> = ({
  placeHolder,
  className,
  onMouseIn,
  value,
  mouseValue,
  onMouseOut,
  onChangeInput
}) => {
  return <SearchBarCourseView placeHolder={placeHolder} className={className} onMouseIn={onMouseIn} value={value} mouseValue={mouseValue} onMouseOut={onMouseOut} 
  onChangeInput={onChangeInput}/>;
};

export default SearchBarCourse;
