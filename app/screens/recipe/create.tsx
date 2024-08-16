import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import RecipeForm from "@/components/features/recipe/form/RecipeForm";
import DetailHeader from "@/components/common/header/DetailHeader";

export default function RecipeCreateScreen() {
  return (
    <DisplayView header={<DetailHeader />}>
      <MainArea>
        <RecipeForm isCreate />
      </MainArea>
    </DisplayView>
  );
}
