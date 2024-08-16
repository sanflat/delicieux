import React, { memo } from 'react';
import { Box } from 'native-base';
import { useThemeDisplayColor } from '@/hooks/useThemeColor';

interface Props {
  header?: React.ReactElement;
  children: React.ReactNode;
  showHeader?: boolean;
}

const DisplayView: React.FC<Props> = memo(({ header, children, showHeader = true }) => {
  const { displayBackground } = useThemeDisplayColor();

  return (
    <Box bg={displayBackground} flex={1} width="full">
      {showHeader && header}
      {children}
    </Box>
  );
});

export default DisplayView;
