import { Text, HStack, Switch, useColorMode } from 'native-base'

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
        offTrackColor="#F8FAFB"
        onTrackColor="#1f1f1f"

        onThumbColor="#F8FAFB"
        offThumbColor="#1f1f1f"
      ></Switch>
      <Text>light</Text>
    </HStack>
  )
}