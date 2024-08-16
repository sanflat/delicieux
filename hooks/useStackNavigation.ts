import { StackProps } from "@/types/interface";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export function useStackNavigation(){
    const navigation = useNavigation<StackNavigationProp<StackProps>>();
    return {
        navigation
    }
}