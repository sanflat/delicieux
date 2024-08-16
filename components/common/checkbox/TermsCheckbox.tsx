import { Link, Text, HStack } from "native-base";
import CustomCheckbox from "@/components/features/todo/list/CustomCheckbox";

interface TermsCheckboxProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  textColor: string;
  textSecondaryColor: string;
  primaryLinkColor: string;
}

export default function TermsCheckbox({
  isChecked,
  setIsChecked,
  textColor,
  textSecondaryColor,
  primaryLinkColor
}: TermsCheckboxProps) {
  return (
    <HStack alignItems="center" justifyContent="space-between" space={2}>
      <CustomCheckbox
        checked={isChecked}
        onPress={() => setIsChecked(!isChecked)}
        color={textColor}
      />
        <Text fontSize={12} color={textSecondaryColor}>
          I agree with{" "}
          <Link href="#" isUnderlined _text={{color: primaryLinkColor, fontSize: 12}} >
            Terms &amp; Conditions
          </Link>{" "}
          and have understood{" "}
          <Link href="#" isUnderlined _text={{color: primaryLinkColor, fontSize: 12}}>
            Privacy Policy
          </Link>
        </Text>
    </HStack>
  );
}
