import { Actionsheet } from "native-base";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  image: string | "";
  onPickImage: (source: "library" | "camera" | null) => void;
};

export default function RecipeActionsheet({
  isOpen,
  onClose,
  image,
  onPickImage,
}: Props) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        {image ? (
          <>
            <Actionsheet.Item onPress={() => onPickImage("library")}>
              変更
            </Actionsheet.Item>
            <Actionsheet.Item onPress={() => onPickImage(null)}>
              削除
            </Actionsheet.Item>
          </>
        ) : (
          <>
            <Actionsheet.Item onPress={() => onPickImage("library")}>
              ギャラリーから選択
            </Actionsheet.Item>
            <Actionsheet.Item onPress={() => onPickImage("camera")}>
              写真を撮る
            </Actionsheet.Item>
          </>
        )}
        <Actionsheet.Item onPress={onClose}>キャンセル</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
