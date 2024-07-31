import React, { useContext } from 'react';
import HeaderView from './Header.view';
import { ObserverContext } from '@/utils/portal/ObserverProvider';

const Header = ({ isTopView }: { isTopView?: boolean }) => {
  const { headerObserver } = useContext(ObserverContext);
  return <HeaderView isTopView={isTopView} headerObserver={headerObserver} />;
};

export default Header;
