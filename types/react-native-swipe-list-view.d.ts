declare module 'react-native-swipe-list-view' {
    import * as React from 'react';
    import {
      FlatListProps,
      SectionListProps,
      StyleProp,
      ViewStyle,
    } from 'react-native';
  
    interface SwipeRowProps<T> {
      swipeKey?: string;
      disableRightSwipe?: boolean;
      disableLeftSwipe?: boolean;
      leftOpenValue?: number;
      rightOpenValue?: number;
      stopLeftSwipe?: number;
      stopRightSwipe?: number;
      friction?: number;
      tension?: number;
      closeOnRowPress?: boolean;
      closeOnRowBeginSwipe?: boolean;
      closeOnRowOpen?: boolean;
      closeOnScroll?: boolean;
      onRowOpen?: (rowKey: string, rowMap: any) => void;
      onRowDidOpen?: (rowKey: string, rowMap: any) => void;
      onRowClose?: (rowKey: string, rowMap: any) => void;
      onRowDidClose?: (rowKey: string, rowMap: any) => void;
      onScrollEnabled?: (isEnabled: boolean) => void;
      swipeToOpenPercent?: number;
      swipeToClosePercent?: number;
      setScrollEnabled?: (isEnabled: boolean) => void;
      style?: StyleProp<ViewStyle>;
    }
  
    export class SwipeRow<T> extends React.Component<SwipeRowProps<T>> {}
  
    interface SwipeListViewProps<T> extends FlatListProps<T> {
      renderHiddenItem: (data: { item: T; index: number }, rowMap: any) => React.ReactNode;
      leftOpenValue?: number;
      rightOpenValue?: number;
      stopLeftSwipe?: number;
      stopRightSwipe?: number;
      closeOnRowPress?: boolean;
      closeOnScroll?: boolean;
      closeOnRowBeginSwipe?: boolean;
      closeOnRowOpen?: boolean;
      closeOnRowClose?: boolean;
      onRowOpen?: (rowKey: string, rowMap: any) => void;
      onRowDidOpen?: (rowKey: string, rowMap: any) => void;
      onRowClose?: (rowKey: string, rowMap: any) => void;
      onRowDidClose?: (rowKey: string, rowMap: any) => void;
      swipeGestureBegan?: (rowKey: string) => void;
      onScrollEnabled?: (isEnabled: boolean) => void;
      disableLeftSwipe?: boolean;
      disableRightSwipe?: boolean;
      previewRowKey?: string;
      previewFirstRow?: boolean;
      previewRowIndex?: number;
      previewDuration?: number;
      previewOpenDelay?: number;
      previewOpenValue?: number;
      friction?: number;
      tension?: number;
      directionalDistanceChangeThreshold?: number;
      swipeToOpenPercent?: number;
      swipeToClosePercent?: number;
      setScrollEnabled?: (isEnabled: boolean) => void;
      style?: StyleProp<ViewStyle>;
    }
  
    export class SwipeListView<T> extends React.Component<SwipeListViewProps<T>> {}
  }
  