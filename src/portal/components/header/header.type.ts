export interface HeaderObserver {
  inView: boolean;
}

export interface HeaderViewProps {
  isTopView?: boolean;
  headerObserver: {
    inView: boolean;
  };
}
