import React, { memo, useState } from "react";
import { Box, HStack } from "native-base";
import HeaderArea from "@/components/layout/HeaderArea";
import { useThemeIconColor } from "@/hooks/useThemeColor";
import SearchInput from "../input/Search";
import RippleButton from "@/components/common/button/RippleButton";
import LogoButton from "../button/LogoButton";

interface RecipeListHeaderProps {
  search: string;
  updateSearch: (searchValue: string) => void;
}

const RecipeListHeader: React.FC<RecipeListHeaderProps> = memo(
  ({ search, updateSearch }) => {
    const [isSearchActive, setSearchActive] = useState(false);
    const { iconPrimaryColor } = useThemeIconColor();

    const handleSearchPress = () => {
      setSearchActive(true);
    };

    const handleCancelPress = () => {
      setSearchActive(false);
      updateSearch("");
    };

    return (
      <HeaderArea>
        {isSearchActive ? (
          <>
            <Box flex={1} justifyContent="center" alignItems="center">
              <HStack w="90%" alignItems="center" space={2}>
                <SearchInput
                  search={search}
                  updateSearch={updateSearch}
                  secondaryIconColor={iconPrimaryColor}
                />
              </HStack>
            </Box>
            <RippleButton
              icon={"close"}
              onPress={handleCancelPress}
              iconColor={iconPrimaryColor}
              iconType={"MaterialCommunityIcons"}
            />
          </>
        ) : (
          <>
            <RippleButton
              icon="search"
              onPress={handleSearchPress}
              iconColor={iconPrimaryColor}
              iconType="MaterialIcons"
            />
            <LogoButton />
          </>
        )}
      </HeaderArea>
    );
  }
);

export default RecipeListHeader;
