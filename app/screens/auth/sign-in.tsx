import AuthForm from "@/components/features/auth/AuthForm";
import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import DefaultHeader from "@/components/common/header/DefaultHeader";

export default function SignInScreen() {
  return (
    <DisplayView header={<DefaultHeader />}>
      <MainArea>
        <AuthForm />
      </MainArea>
    </DisplayView>
  );
}
