import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import Loading from "@/components/common/status/Loading";
import Error from "@/components/common/status/ErrorAlert"

import RecipeDetail from "@/components/features/recipe/detail/RecipeDetail";
import RecipeDetailHeader from "@/components/common/header/RecipeDetailHeader";
import RecipeStepsBottomSheet from "@/components/features/recipe/detail/RecipeStepsBottomSheet";
import { RecipeDeleteModal } from "@/components/features/recipe/modal/RecipeDeleteModal";
import useFetchRecipe from "@/hooks/useFetchRecipe";

export default function RecipeDetailScreen() {
    const route = useRoute();
    const { id } = route.params as { id: string };
    const [deleteModal, setDeleteModal] = useState(false);
    const {
      recipe, loading, error, userName
    } = useFetchRecipe(id);

    if (error) {
        return (
            <Error/>
        );
    }

    if (loading || !recipe) {
        return (
            <Loading/>
        );
    }

    return (
        <DisplayView header={<RecipeDetailHeader recipeId={id} setDeleteModal={setDeleteModal} />}>
            <KeyboardAwareScrollView
                style={{ flex: 1, marginBottom: 30 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
            >
                <MainArea>
                    <RecipeDetail recipe={recipe} userName={userName}/>
                    {/* Delete modal */}
                    <RecipeDeleteModal
                        deleteId={id}
                        deleteModal={deleteModal}
                        setDeleteModal={setDeleteModal}
                    />
                </MainArea>
            </KeyboardAwareScrollView>
            <RecipeStepsBottomSheet steps={recipe.steps} />
        </DisplayView>
    );
}
