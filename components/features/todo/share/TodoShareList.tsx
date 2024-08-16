import TodoShareItem from "@/components/features/todo/share/TodoShareItem";
import { ToDo } from "@/types/interface";
import { Box, HStack, VStack, FlatList } from "native-base";

interface TodoShareProps {
  data: ToDo[];
  onPressLabel: (itemId: string) => void;
}

export default function TodoShareList({ data, onPressLabel }: TodoShareProps) {
  const renderItem = ({ item }: { item: ToDo }) => (
    <Box mb="10px">
      <Box pl="4" pr="5" py="2">
        <HStack alignItems="center" justifyContent="space-between" space={2}>
          <VStack>
            <TodoShareItem data={item} onPressLabel={onPressLabel} />
          </VStack>
        </HStack>
      </Box>
    </Box>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
    />
  );
}
