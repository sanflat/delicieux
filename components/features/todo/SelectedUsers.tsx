import React, { useEffect, useState, useCallback } from "react";
import { fetchUsers } from "@/services/userService";
import { User } from "@/types/interface";
import { useThemeIconColor, useThemeTextColor } from "@/hooks/useThemeColor";
import useAuth from "@/hooks/useAuth";
import SearchInput from "@/components/common/input/Search";
import CustomCheckbox from "./list/CustomCheckbox";
import { Box, Text, HStack, VStack, FlatList } from "native-base";

interface SelectedUsersProps {
  handleShareUserId: (userId: string) => void;
}

interface UserWithStatus extends User {
  isCompleted: boolean;
}

export default function SelectedUsers({
  handleShareUserId,
}: SelectedUsersProps) {
  const { iconPrimaryColor } = useThemeIconColor();
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState<UserWithStatus[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithStatus[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      const fetchAndSetUsers = async () => {
        try {
          const usersData = await fetchUsers();
          if (usersData) {
            const usersWithStatus = usersData
              .filter((u) => u.id !== user.id)
              .map((u) => ({
                ...u,
                isCompleted: false,
              }));
            setAllUsers(usersWithStatus);
            setFilteredUsers(usersWithStatus);
          }
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };
      fetchAndSetUsers();
    }
  }, [user?.id]);

  useEffect(() => {
    const filtered = allUsers.filter((u) =>
      u.userName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, allUsers]);

  const updateSearch = useCallback((searchValue: string) => {
    setSearch(searchValue);
  }, []);

  const handleStatusChange = (userId: string, isChecked: boolean) => {
    const updatedUsers = allUsers.map((user) =>
      user.id === userId ? { ...user, isCompleted: isChecked } : user
    );
    setAllUsers(updatedUsers);
    handleShareUserId(userId);
  };

  const { textPrimaryColor } = useThemeTextColor();

  const renderItem = ({ item }: { item: UserWithStatus }) => (
    <Box mb="10px" mt={2} ml={2}>
      <HStack alignItems="center" justifyContent="space-between" space={2}>
        <VStack>
          <HStack
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            key={item.id}
          >
            <CustomCheckbox
              checked={item.isCompleted}
              color={textPrimaryColor}
              onPress={() => handleStatusChange(item.id, !item.isCompleted)}
            />
            <Text width="100%" flexShrink={1} textAlign="left" mx="2">
              {item.userName}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <HStack w="80%" alignItems="center" height="30px" my={6}>
        <SearchInput
          search={search}
          updateSearch={updateSearch}
          secondaryIconColor={iconPrimaryColor}
        />
      </HStack>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </Box>
  );
}
