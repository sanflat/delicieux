import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar } from 'react-native'
import { VStack } from 'native-base'

interface HeaderAreaProps {
    children: ReactNode;
}
  
const HeaderArea: React.FC<HeaderAreaProps> = ({ children　}) => {
  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight
      }}
    >
      <VStack
        px="3"
        pb="1"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        {children}
      </VStack>
    </SafeAreaView>
  )
}

export default HeaderArea