import React, { useState, useEffect, useCallback } from "react";
import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import CustomFab from "@/components/common/button/CustomFab";
import TodoListHeader from "@/components/common/header/TodoListHeader";
import { ScrollView } from "native-base";
import { subscribeToTasks, addTodo } from "@/services/todoService";
import TodoList from "@/components/features/todo/list/TodoList";
import { ToDo } from "@/types/interface";
import useAuth from "@/hooks/useAuth";

export default function TodoListScreen() {
  const [data, setData] = useState<ToDo[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const unsubscribe = subscribeToTasks(user.id, setData);
    return unsubscribe;
  }, [user?.id]);

  const handleAddTodo = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    const userId = user.id;
    setUserIds((prevIds) => {
      return [...prevIds, userId];
    });
    const newTodo = {
      text: "",
      userIds: userIds,
      done: false,
    };

    try {
      const addedTodoId = await addTodo(
        newTodo.text,
        newTodo.userIds,
        newTodo.done
      );

      if (addedTodoId) {
        setData((prevData) => {
          if (prevData.some((todo) => todo.id === addedTodoId)) return prevData;
          // 新しい Todo を配列の最後に追加
          return [...prevData, { ...newTodo, id: addedTodoId }];
        });
        setEditingItemId(addedTodoId);
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }, [user]);

  const handleFinishEditing = () => {
    setEditingItemId(null);
  };

  const handlePressLabel = (itemId: string) => {
    setEditingItemId(itemId);
  };

  return (
    <DisplayView header={<TodoListHeader />}>
      <ScrollView>
        <MainArea>
          <TodoList
            data={data}
            editingItemId={editingItemId}
            onFinishEditing={handleFinishEditing}
            onPressLabel={handlePressLabel}
          />
        </MainArea>
      </ScrollView>

      <CustomFab
        icon="plus"
        onPress={handleAddTodo}
        iconType="MaterialCommunityIcons"
      />
    </DisplayView>
  );
}
