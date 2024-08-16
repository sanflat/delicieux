import React, { ReactNode } from "react";
import { Box } from "native-base";

interface MainAreaProps {
  children: ReactNode;
}

const MainArea: React.FC<MainAreaProps> = ({ children }) => {
  return (
    <Box flex={1} p={4}>
      {children}
    </Box>
  );
};

export default MainArea;
