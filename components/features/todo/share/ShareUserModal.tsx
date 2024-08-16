import {
  Modal,
  HStack,
  Icon,
  Text,
  VStack,
  Button,
  useToast,
  Box
} from "native-base";
import SelectedUsers from "@/components/features/todo/SelectedUsers";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeTextColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/common/text/ThemedText";

type Props = {
  shareModal: boolean;
  setShareModal: (show: boolean) => void;
  handleShareUserId: (userId: string) => void;
  handleShare: () => void;
};

export function ShareUserModal({
  shareModal,
  setShareModal,
  handleShareUserId,
  handleShare,
}: Props) {
  const toast = useToast();
  const { textPrimaryColor, textBackground } = useThemeTextColor();

  const handleShared = async () => {
    try {
      setShareModal(false); // モーダルを閉じる
      handleShare();
      toast.show({
        description: "Shared Success",
        colorScheme: "success", // 成功のステータス
        duration: 3000, // 表示時間
      });
    } catch (error) {
      toast.show({
        description: "Shared Error",
        colorScheme: "error", // エラーのステータス
        duration: 3000, // 表示時間
      });
    }
  };

  return (
    <Modal isOpen={shareModal} onClose={() => setShareModal(false)}>
      <Modal.Content bgColor={textBackground} width="90%" height="80%">
        <Modal.CloseButton />
        <Modal.Header bgColor={textBackground} borderColor="transparent">
          <HStack space={2} alignItems="center">
            <Icon as={MaterialIcons} name="mobile-screen-share" />
            <Text textAlign="center">Share</Text>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <Box alignItems="center">
            <ThemedText
              color={textPrimaryColor}
              type="defaultSemiBold"
              text="Share the checked data with users."
            />
          </Box>
          <VStack>
            <SelectedUsers handleShareUserId={handleShareUserId} />
          </VStack>
        </Modal.Body>
        <Modal.Footer bgColor={textBackground} borderColor="transparent">
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShareModal(false);
              }}
            >
              Cancel
            </Button>
            <Button onPress={handleShared}>Share</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
