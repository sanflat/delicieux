import React, { useState, useEffect } from "react";
import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import CustomFab from "@/components/common/button/CustomFab";
import DetailHeader from "@/components/common/header/DetailHeader";
import { ScrollView } from "native-base";
import {
  subscribeToTasks,
  updateTodoShare,
  resetTodoShare,
} from "@/services/todoService";
import TodoShareList from "@/components/features/todo/share/TodoShareList";
import { ToDo } from "@/types/interface";
import { ShareUserModal } from "@/components/features/todo/share/ShareUserModal";
import useAuth from "@/hooks/useAuth";
import { useStackNavigation } from "@/hooks/useStackNavigation";

export default function TodoShareScreen() {
  const [data, setData] = useState<ToDo[]>([]);
  const [shareUserIds, setShareUserIds] = useState<string[]>([]);
  const [shareItemIds, setShareItemIds] = useState<string[]>([]);
  const [shareModal, setShareModal] = useState(false);
  const { user } = useAuth();
  const { navigation } = useStackNavigation();

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const unsubscribe = subscribeToTasks(user.id, setData);
    return unsubscribe;
  }, [user?.id]);

  const handlePressLabel = (id: string) => {
    setShareItemIds((prevIds) => {
      if (prevIds.includes(id)) {
        // IDがすでにリストに存在する場合、そのIDを除外して新しい配列を返す
        return prevIds.filter((item) => item !== id);
      } else {
        // IDが存在しない場合、リストにIDを追加する
        return [...prevIds, id];
      }
    });
  };

  const handleShareUser = () => {
    setShareModal(true);
  };

  const handleShareUserId = (userId: string) => {
    setShareUserIds((prevIds) =>
      prevIds.includes(userId) ? prevIds.filter((id) => id !== userId) : [...prevIds, userId]
    );
  };

  const handleShare = () => {
    if (!user?.id) return;
    if (shareUserIds.length === 0) {
      resetTodoShare(user.id, shareItemIds);
    } else {
      updateTodoShare(user.id, shareItemIds, shareUserIds);
    }
    navigation.navigate("TodoList");
  };

  return (
    <DisplayView header={<DetailHeader />}>
      <MainArea>
        <ScrollView>
          <TodoShareList data={data} onPressLabel={handlePressLabel} />
        </ScrollView>

        <CustomFab
          icon="mobile-screen-share"
          onPress={handleShareUser}
          iconType="MaterialIcons"
        />
        <ShareUserModal
          shareModal={shareModal}
          setShareModal={setShareModal}
          handleShareUserId={handleShareUserId}
          handleShare={handleShare}
        />
      </MainArea>
    </DisplayView>
  );
}
