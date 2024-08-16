import {
  Modal,
  HStack,
  Icon,
  Text,
  VStack,
  Button,
  useToast
} from "native-base";
import { deleteRecipe } from "@/services/recipeService";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeTextColor } from "@/hooks/useThemeColor";
import { useStackNavigation } from "@/hooks/useStackNavigation";

type Props = {
  deleteId: string;
  deleteModal: boolean;
  setDeleteModal: (show: boolean) => void;
};

export function RecipeDeleteModal({
  deleteId,
  deleteModal,
  setDeleteModal,
}: Props) {
  const toast = useToast();
  const { navigation } = useStackNavigation();
  const {
    textPrimaryColor,
    textBackground,
  } = useThemeTextColor();

  const handleDelete = async () => {
    try {
      setDeleteModal(false); // モーダルを閉じる
      await deleteRecipe(deleteId); // レシピの削除を試みる
      toast.show({
        description: "削除しました。",
        colorScheme: "success", // 成功のステータス
        duration: 3000, // 表示時間
      });
      navigation.navigate("RecipeList");
    } catch (error) {
      console.error("削除に失敗しました:", error);
      toast.show({
        description: "削除に失敗しました。",
        colorScheme: "error", // エラーのステータス
        duration: 3000, // 表示時間
      });
    }
  };

  return (
    <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
      <Modal.Content bgColor={textBackground} width="90%">
        <Modal.CloseButton />
        <Modal.Header bgColor={textBackground} borderColor="transparent">
          <HStack space={2} alignItems="center">
            <Icon as={MaterialIcons} name="delete" />
            <Text textAlign="center">Delete</Text>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <VStack space={4} alignItems="center" justifyContent="center">
            <Text fontSize="md" color={textPrimaryColor} textAlign="center">
              このレシピを削除しても良いですか？
            </Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer bgColor={textBackground} borderColor="transparent">
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setDeleteModal(false);
              }}
            >
              Cancel
            </Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
