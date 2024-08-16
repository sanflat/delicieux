import React, { useState } from "react";
import {
  VStack,
  Input,
  Box,
  Text,
  Center,
  Button,
  Modal,
  FormControl,
  Alert,
  HStack,
  Link,
  IconButton,
  CloseIcon,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ripple from "react-native-material-ripple";
import useAuth from "@/hooks/useAuth";
import { useStackNavigation } from "@/hooks/useStackNavigation";
import {
  useThemeTextColor,
  useThemeBtnColor,
  useThemeDisplayColor,
} from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/common/text/ThemedText";
import EmailInput from "@/components/common/input/Email";
import PasswordInput from "@/components/common/input/Password";
import DefaultInput from "@/components/common/input/Default";
import TermsCheckbox from "@/components/common/checkbox/TermsCheckbox";

interface AuthFormProps {
  isSignUp?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {
    signIn,
    signUp,
    signInPasswordReset,
    error,
    successMessage,
    clearSuccessMessage,
  } = useAuth();
  const { navigation } = useStackNavigation();
  const { displayBackground } = useThemeDisplayColor();
  const {
    textPrimaryColor,
    textSecondaryColor,
    textBackground,
    placeholderColor,
    linkColor,
  } = useThemeTextColor();
  const { btnTextColor, btnBackground } = useThemeBtnColor();

  const handleResetEmailSubmit = async () => {
    await signInPasswordReset(resetEmail);
    setModalVisible(false);
  };

  const handleAuthAction = async () => {
    if (isSignUp) {
      await signUp(email, password, userName);
    } else {
      await signIn(email, password);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      scrollEnabled={true}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <Box flex={1} bg={displayBackground} w="full">
        <Center flex={1} justifyContent="flex-start" pt={10}>
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <ThemedText color={textPrimaryColor} text="Welcome!" type="title" />
            <Text mt="1" color={textSecondaryColor} fontWeight="medium">
              {isSignUp ? "Sign up to get started." : "Sign in to get started."}
            </Text>

            <VStack space={3} mt="5">
              {successMessage && (
                <Alert w="100%" status="success">
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={3}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text
                          fontSize="md"
                          fontWeight="medium"
                          color={textPrimaryColor}
                        >
                          {successMessage}
                        </Text>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        icon={<CloseIcon size="3" color={textPrimaryColor} />}
                        onPress={clearSuccessMessage}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              )}

              <EmailInput
                email={email}
                setEmail={setEmail}
                textColor={textPrimaryColor}
                placeholderColor={placeholderColor}
              />

              <PasswordInput
                password={password}
                setPassword={setPassword}
                textColor={textPrimaryColor}
                placeholderColor={placeholderColor}
              />

              {isSignUp && (
                <DefaultInput
                  placeholder="UserName"
                  state={userName}
                  setState={setUserName}
                  textColor={textPrimaryColor}
                  placeholderColor={placeholderColor}
                />
              )}
              {!isSignUp ? (
                <Link
                  _text={{
                    color: linkColor,
                    fontWeight: "500",
                    fontSize: "xs",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                  onPress={() => setModalVisible(true)}
                >
                  Forgot password
                </Link>
              ) : (
                <TermsCheckbox
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  textColor={textPrimaryColor}
                  textSecondaryColor={textSecondaryColor}
                  primaryLinkColor={linkColor}
                />
              )}
              <Ripple
                style={{
                  marginTop: 10,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: btnBackground,
                  borderWidth: 1,
                  borderColor: linkColor,
                  borderRadius: 5,
                  alignItems: "center",
                }}
                onPress={handleAuthAction}
              >
                <Text style={{ color: btnTextColor, fontWeight: "bold" }}>
                  {isSignUp ? "Get started" : "Sign in"}
                </Text>
              </Ripple>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color={textSecondaryColor}>
                  {isSignUp
                    ? "Don't have an account yet? "
                    : "Already registered? "}
                </Text>
                <Link
                  _text={{
                    color: linkColor,
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => {
                    navigation.navigate(isSignUp ? "SignIn" : "SignUp");
                  }}
                >
                  {isSignUp ? "Login" : "Sign up"}
                </Link>
              </HStack>
            </VStack>

            {error && <Alert status="error">{error}</Alert>}
            {successMessage && <Alert status="success">{successMessage}</Alert>}

            <Modal
              isOpen={isModalVisible}
              onClose={() => setModalVisible(false)}
            >
              <Modal.Content bgColor={textBackground}>
                <Modal.CloseButton />
                <Modal.Header bgColor={textBackground} color={textPrimaryColor}>
                  パスワードリセット
                </Modal.Header>
                <Modal.Body bgColor={textBackground}>
                  <FormControl>
                    <FormControl.Label color={textSecondaryColor}>
                      Email
                    </FormControl.Label>
                    <Input
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChangeText={setResetEmail}
                      color={textPrimaryColor}
                      placeholderTextColor={placeholderColor}
                    />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onPress={handleResetEmailSubmit}
                    backgroundColor={btnBackground}
                    borderWidth={1}
                  >
                    <Text color={textPrimaryColor} fontSize="sm">リセットリンクを受け取る</Text>
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Box>
        </Center>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default AuthForm;
