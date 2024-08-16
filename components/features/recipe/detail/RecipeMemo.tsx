import React from "react";
import { Box, Text, useColorModeValue } from "native-base";
import {ThemedText} from "@/components/common/text/ThemedText";
import theme from "@/themes/colors";

type Props = {
  memo: string;
  titleColor: string;
  textColor: string;
  borderColor: string;
};

const RecipeMemo = ({ memo, titleColor, textColor, borderColor }: Props) => {

  return (
    <>
      <ThemedText color={titleColor} text={"メモ"} type="defaultSemiBold" />
      <Box mt="2" px="4" py="2" borderWidth={1} borderColor={borderColor} borderRadius="md">
        <ThemedText color={textColor} text={memo} type="default" />
      </Box>
    </>
  );
};

export default RecipeMemo;
