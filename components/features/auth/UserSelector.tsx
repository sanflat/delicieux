import React, { useEffect, useState } from 'react';
import { Button, VStack, Spinner, Text, Center } from 'native-base';
import { fetchUsers } from '@/services/userService';
import { User } from '@/types/interface';
import useAuth from "@/hooks/useAuth";

type Props = {
  handleShareUserId: (userId: string) => void;
}

const UserSelector = ({ handleShareUserId }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData.filter(u => u.id !== user?.id));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchAndSetUsers();
  }, [user?.id]);

  return (
    <Center>
      <VStack w="3/4" maxW="300" space={2}>
        {users.length > 0 ? (
          users.map(user => (
            <Button
              key={user.id}
              onPress={() => handleShareUserId(user.id)}
              variant="subtle"
            >
              {user.userName}
            </Button>
          ))
        ) : (
          <>
            <Spinner color="cyan.500" />
            <Text mt="4" fontSize="md" color="coolGray.600">
              No other users available
            </Text>
          </>
        )}
      </VStack>
    </Center>
  );
};

export default UserSelector;
