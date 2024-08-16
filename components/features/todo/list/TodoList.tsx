import TodoItem from "@/components/features/todo/list/TodoItem";
import { ToDo } from "@/types/interface";
import { Box, HStack, VStack, FlatList } from "native-base";

interface TodoListProps {
  data: ToDo[];
  editingItemId: string | null;
  onFinishEditing: () => void;
  onPressLabel: (itemId: string) => void;
}

export default function TodoList({
  data,
  editingItemId,
  onFinishEditing,
  onPressLabel,
}: TodoListProps) {

  const renderItem = ({ item }: { item: ToDo }) => (
    <Box mb="10px">
      <Box pl="4" py="1">
        <HStack alignItems="center" justifyContent="space-between" space={2}>
          <VStack width="full">
            <TodoItem
              data={item}
              editingItemId={editingItemId}
              onFinishEditing={onFinishEditing}
              onPressLabel={onPressLabel}
            />
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
