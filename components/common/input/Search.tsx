import { Input } from "native-base";
import RippleButton from "@/components/common/button/RippleButton";

interface SearchInputProps {
  search: string;
  updateSearch: (searchValue: string) => void
  secondaryIconColor: string;
}

export default function SearchInput({
  search,
  updateSearch,
  secondaryIconColor,
}: SearchInputProps) {
  return (
    <Input
      value={search}
      onChangeText={updateSearch}
      placeholder="Search"
      width="100%"
      borderRadius="20"
      px="0"
      fontSize="sm"
      InputLeftElement={
        <RippleButton
          icon="search"
          onPress={() => {}}
          iconColor={secondaryIconColor}
          iconType="MaterialIcons"
        />
      }
    />
  );
}
