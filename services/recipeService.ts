import {
  collection,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  User,
  Recipe,
  Ingredient,
  Step,
  RecipeWithUserName,
} from "@/types/interface";

/**
 * 特定のユーザーのレシピを非同期で取得します。
 * ユーザーがnullである場合は何もしません。
 *
 * @param {string} userId ログインしているユーザーのID
 * @return {Promise<Recipe[] | null>} 取得したレシピの配列またはユーザーがnullの場合はnullを返します。
 */
export const fetchUserRecipes = async (
  userId: string | null
): Promise<Recipe[] | null> => {
  if (!userId) return null; // ユーザー情報がなければ処理を中断

  const stubRecipes = [
    {
      id: "1",
      name: "Leek Tart",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A perfect warm starter for winter",
      steps: [
        {
          id: 1,
          text: "Prepare the pastry dough and place it in a mold.",
          image: null,
        },
        {
          id: 2,
          text: "Slice the leeks and sauté in a pan.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Pour the leeks onto the pastry and add the quiche mixture.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 4,
          text: "Bake in a preheated oven at 350°F (180°C) for 25 minutes.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Pastry dough", quantity: "1" },
        { id: 2, text: "Leeks", quantity: "3" },
        { id: 3, text: "Heavy cream", quantity: "100 ml" },
        { id: 4, text: "Eggs", quantity: "2" },
        { id: 5, text: "Salt and pepper", quantity: "to taste" },
      ],
      userId: userId,
    },
    {
      id: "2",
      name: "Ratatouille",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A classic Provençal dish, ideal as a side for any meal",
      steps: [
        { id: 1, text: "Dice the vegetables.", image: null },
        {
          id: 2,
          text: "Sauté each vegetable separately.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Mix all the vegetables and simmer with herbs de Provence.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Eggplants", quantity: "2" },
        { id: 2, text: "Zucchinis", quantity: "2" },
        { id: 3, text: "Red bell peppers", quantity: "1" },
        { id: 4, text: "Tomatoes", quantity: "3" },
        { id: 5, text: "Onions", quantity: "1" },
        { id: 6, text: "Herbs de Provence", quantity: "1 tbsp" },
      ],
      userId: userId,
    },
    {
      id: "3",
      name: "Bouillabaisse",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Traditional fish soup from Marseille",
      steps: [
        { id: 1, text: "Prepare the fish and seafood.", image: null },
        {
          id: 2,
          text: "Make a fish stock with fish heads.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Add the fish and vegetables to the stock and simmer gently.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Mixed fish", quantity: "2.2 lbs (1 kg)" },
        { id: 2, text: "Seafood", quantity: "1.1 lbs (500 g)" },
        { id: 3, text: "Potatoes", quantity: "3" },
        { id: 4, text: "Tomatoes", quantity: "2" },
        { id: 5, text: "Onions", quantity: "1" },
        { id: 6, text: "Saffron", quantity: "a pinch" },
      ],
      userId: userId,
    },
    {
      id: "4",
      name: "Crème Brûlée",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A dessert with a rich texture and caramelized top",
      steps: [
        { id: 1, text: "Preheat the oven to 212°F (100°C).", image: null },
        {
          id: 2,
          text: "Whisk cream, egg yolks, and sugar together.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Pour into ramekins and cook in a water bath.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 4,
          text: "Sprinkle sugar on top and caramelize with a torch.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Heavy cream", quantity: "1 cup (250 ml)" },
        { id: 2, text: "Egg yolks", quantity: "3" },
        { id: 3, text: "Sugar", quantity: "1/4 cup (50 g)" },
        { id: 4, text: "Vanilla sugar", quantity: "1 packet" },
      ],
      userId: userId,
    },
    {
      id: "5",
      name: "Duck à l’Orange",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Roast duck served with an orange sauce",
      steps: [
        { id: 1, text: "Season the duck and roast in the oven.", image: null },
        {
          id: 2,
          text: "Prepare the orange sauce with fresh orange juice, sugar, and vinegar.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Pour the sauce over the duck and serve.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Whole duck", quantity: "1" },
        { id: 2, text: "Oranges", quantity: "3" },
        { id: 3, text: "Sugar", quantity: "2 tbsp (30 g)" },
        { id: 4, text: "Vinegar", quantity: "2 tbsp" },
      ],
      userId: userId,
    },
    {
      id: "6",
      name: "Coq au Vin",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Chicken slowly cooked in red wine with mushrooms and onions",
      steps: [
        { id: 1, text: "Brown the chicken pieces.", image: null },
        {
          id: 2,
          text: "Add red wine, mushrooms, onions, and simmer.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Rooster or chicken", quantity: "1" },
        { id: 2, text: "Red wine", quantity: "3 cups (750 ml)" },
        { id: 3, text: "Mushrooms", quantity: "9 oz (250 g)" },
        { id: 4, text: "Small onions", quantity: "7 oz (200 g)" },
        { id: 5, text: "Garlic", quantity: "4 cloves" },
        { id: 6, text: "Bouquet garni", quantity: "1" },
      ],
      userId: userId,
    },
    {
      id: "7",
      name: "Cheese Soufflé",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A light and airy soufflé with Gruyère cheese",
      steps: [
        {
          id: 1,
          text: "Prepare the béchamel base and add grated cheese.",
          image: null,
        },
        {
          id: 2,
          text: "Fold in the beaten egg whites until stiff.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake in a preheated oven at 375°F (190°C) until puffed and golden.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Grated Gruyère", quantity: "5 oz (150 g)" },
        { id: 2, text: "Milk", quantity: "1 cup (250 ml)" },
        { id: 3, text: "Butter", quantity: "2 tbsp (30 g)" },
        { id: 4, text: "Flour", quantity: "2 tbsp (30 g)" },
        { id: 5, text: "Eggs", quantity: "4 (separated)" },
      ],
      userId: userId,
    },
    {
      id: "8",
      name: "Chocolate Mousse",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A rich mousse made with dark chocolate and cream",
      steps: [
        {
          id: 1,
          text: "Melt the chocolate with a bit of butter.",
          image: null,
        },
        {
          id: 2,
          text: "Add the egg yolks and mix vigorously.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Gently fold in the whipped egg whites.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Dark chocolate", quantity: "7 oz (200 g)" },
        { id: 2, text: "Butter", quantity: "2 tbsp (30 g)" },
        { id: 3, text: "Eggs", quantity: "6 (separated)" },
        { id: 4, text: "Sugar", quantity: "1/2 cup (100 g)" },
      ],
      userId: userId,
    },
    {
      id: "9",
      name: "Niçoise Salad",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A refreshing salad with tuna, olives, and hard-boiled eggs",
      steps: [
        {
          id: 1,
          text: "Prepare all ingredients and arrange in a large salad bowl.",
          image: null,
        },
        {
          id: 2,
          text: "Dress with olive oil, vinegar, salt, and pepper.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Canned tuna", quantity: "7 oz (200 g)" },
        { id: 2, text: "Cherry tomatoes", quantity: "5 oz (150 g)" },
        { id: 3, text: "Black olives", quantity: "2 oz (50 g)" },
        { id: 4, text: "Hard-boiled eggs", quantity: "4" },
        { id: 5, text: "Green beans", quantity: "5 oz (150 g)" },
        { id: 6, text: "Potatoes", quantity: "7 oz (200 g)" },
        { id: 7, text: "Lettuce", quantity: "1 head" },
        { id: 8, text: "Anchovies", quantity: "2 oz (50 g)" },
      ],
      userId: userId,
    },
    {
      id: "10",
      name: "Filet Mignon in Pastry",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Filet mignon wrapped in puff pastry, served with a mushroom sauce",
      steps: [
        { id: 1, text: "Sear the filet mignon in a hot pan.", image: null },
        {
          id: 2,
          text: "Wrap the filet in puff pastry with foie gras and mushrooms.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake in the oven at 390°F (200°C) until the pastry is golden.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Filet mignon", quantity: "1.1 lbs (500 g)" },
        { id: 2, text: "Puff pastry", quantity: "1 roll" },
        { id: 3, text: "Foie gras", quantity: "3.5 oz (100 g)" },
        { id: 4, text: "Mushrooms", quantity: "3.5 oz (100 g)" },
        { id: 5, text: "Egg yolk", quantity: "1 (for glazing)" },
      ],
      userId: userId,
    },
    {
      id: "11",
      name: "Beef Bourguignon",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Beef slow-cooked in red wine with mushrooms and bacon",
      steps: [
        { id: 1, text: "Brown the beef cubes in a heavy pan.", image: null },
        {
          id: 2,
          text: "Add red wine, mushrooms, onions, and bacon, then simmer slowly.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Beef chuck", quantity: "2 lbs" },
        { id: 2, text: "Red wine", quantity: "4 cups" },
        { id: 3, text: "Mushrooms", quantity: "8 oz" },
        { id: 4, text: "Bacon", quantity: "4 oz" },
        { id: 5, text: "Onions", quantity: "2 medium" },
        { id: 6, text: "Garlic", quantity: "3 cloves" },
        { id: 7, text: "Bouquet garni", quantity: "1" },
      ],
      userId: userId,
    },
    {
      id: "12",
      name: "Quiche Lorraine",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A savory pie from Lorraine filled with bacon, cheese, and eggs",
      steps: [
        {
          id: 1,
          text: "Prepare the pastry crust and lay it in a pie dish.",
          image: null,
        },
        {
          id: 2,
          text: "Mix the bacon, cheese, and eggs and pour into the crust.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake until the filling is set and the crust is golden.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Pastry dough", quantity: "1" },
        { id: 2, text: "Bacon", quantity: "6 oz" },
        { id: 3, text: "Gruyère cheese", quantity: "4 oz" },
        { id: 4, text: "Eggs", quantity: "3" },
        { id: 5, text: "Heavy cream", quantity: "1 cup" },
      ],
      userId: userId,
    },
    {
      id: "13",
      name: "French Onion Soup",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Rich and comforting soup topped with toasted bread and melted cheese",
      steps: [
        { id: 1, text: "Caramelize the onions slowly in butter.", image: null },
        {
          id: 2,
          text: "Add beef stock and simmer for richness.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Top with toasted bread and cheese, then broil until melted.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Onions", quantity: "6 large" },
        { id: 2, text: "Butter", quantity: "3 tbsp" },
        { id: 3, text: "Beef stock", quantity: "4 cups" },
        { id: 4, text: "Gruyère cheese", quantity: "6 oz" },
        { id: 5, text: "French bread", quantity: "4 slices" },
      ],
      userId: userId,
    },
    {
      id: "14",
      name: "Raspberry Tart",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A delightful dessert with fresh raspberries on a sweet pastry base",
      steps: [
        {
          id: 1,
          text: "Prepare the sweet pastry base and bake until lightly browned.",
          image: null,
        },
        {
          id: 2,
          text: "Arrange fresh raspberries on the cooled pastry.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Glaze with warmed apricot jam for a shiny finish.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Sweet pastry dough", quantity: "1" },
        { id: 2, text: "Fresh raspberries", quantity: "2 cups" },
        { id: 3, text: "Apricot jam", quantity: "1/2 cup" },
      ],
      userId: userId,
    },
    {
      id: "15",
      name: "Gratin Dauphinois",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Sliced potatoes baked in cream and garlic for a golden crust",
      steps: [
        {
          id: 1,
          text: "Slice potatoes thinly and layer in a buttered dish.",
          image: null,
        },
        {
          id: 2,
          text: "Mix cream, garlic, and nutmeg and pour over the potatoes.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake until the potatoes are tender and the top is golden and bubbly.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Potatoes", quantity: "2 lbs" },
        { id: 2, text: "Heavy cream", quantity: "2 cups" },
        { id: 3, text: "Garlic", quantity: "2 cloves" },
        { id: 4, text: "Nutmeg", quantity: "a pinch" },
        { id: 5, text: "Butter", quantity: "to grease" },
      ],
      userId: userId,
    },
  ];

  return new Promise<Recipe[] | null>((resolve) => {
    setTimeout(() => {
      console.log("スタブデータのレシピが見つかりました");
      resolve(stubRecipes);
    }, 500); // 0.5秒後にレスポンスを模擬
  });
};

/**
 * 特定のレシピIDを使用してスタブデータからレシピを取得します。
 * @param {string} recipeId レシピのドキュメントID
 * @return {Promise<Recipe | null>} レシピのデータを返します。見つからない場合はnullを返します。
 */
export const fetchRecipeByRecipeId = async (
  recipeId: string
): Promise<Recipe | null> => {
  const recipes: { [key: string]: Recipe } = {
    "1":{
      id: "1",
      name: "Leek Tart",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A perfect warm starter for winter",
      steps: [
        {
          id: 1,
          text: "Prepare the pastry dough and place it in a mold.",
          image: null,
        },
        {
          id: 2,
          text: "Slice the leeks and sauté in a pan.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Pour the leeks onto the pastry and add the quiche mixture.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 4,
          text: "Bake in a preheated oven at 350°F (180°C) for 25 minutes.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Pastry dough", quantity: "1" },
        { id: 2, text: "Leeks", quantity: "3" },
        { id: 3, text: "Heavy cream", quantity: "100 ml" },
        { id: 4, text: "Eggs", quantity: "2" },
        { id: 5, text: "Salt and pepper", quantity: "to taste" },
      ],
      userId: "stbUserId",
    },
    "2":{
      id: "2",
      name: "Ratatouille",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A classic Provençal dish, ideal as a side for any meal",
      steps: [
        { id: 1, text: "Dice the vegetables.", image: null },
        {
          id: 2,
          text: "Sauté each vegetable separately.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Mix all the vegetables and simmer with herbs de Provence.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Eggplants", quantity: "2" },
        { id: 2, text: "Zucchinis", quantity: "2" },
        { id: 3, text: "Red bell peppers", quantity: "1" },
        { id: 4, text: "Tomatoes", quantity: "3" },
        { id: 5, text: "Onions", quantity: "1" },
        { id: 6, text: "Herbs de Provence", quantity: "1 tbsp" },
      ],
      userId: "stbUserId",
    },
    "3":{
      id: "3",
      name: "Bouillabaisse",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Traditional fish soup from Marseille",
      steps: [
        { id: 1, text: "Prepare the fish and seafood.", image: null },
        {
          id: 2,
          text: "Make a fish stock with fish heads.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Add the fish and vegetables to the stock and simmer gently.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Mixed fish", quantity: "2.2 lbs (1 kg)" },
        { id: 2, text: "Seafood", quantity: "1.1 lbs (500 g)" },
        { id: 3, text: "Potatoes", quantity: "3" },
        { id: 4, text: "Tomatoes", quantity: "2" },
        { id: 5, text: "Onions", quantity: "1" },
        { id: 6, text: "Saffron", quantity: "a pinch" },
      ],
      userId: "stbUserId",
    },
    "4":{
      id: "4",
      name: "Crème Brûlée",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A dessert with a rich texture and caramelized top",
      steps: [
        { id: 1, text: "Preheat the oven to 212°F (100°C).", image: null },
        {
          id: 2,
          text: "Whisk cream, egg yolks, and sugar together.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Pour into ramekins and cook in a water bath.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 4,
          text: "Sprinkle sugar on top and caramelize with a torch.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Heavy cream", quantity: "1 cup (250 ml)" },
        { id: 2, text: "Egg yolks", quantity: "3" },
        { id: 3, text: "Sugar", quantity: "1/4 cup (50 g)" },
        { id: 4, text: "Vanilla sugar", quantity: "1 packet" },
      ],
      userId: "stbUserId",
    },
    "5":{
      id: "5",
      name: "Duck à l’Orange",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Roast duck served with an orange sauce",
      steps: [
        { id: 1, text: "Season the duck and roast in the oven.", image: null },
        {
          id: 2,
          text: "Prepare the orange sauce with fresh orange juice, sugar, and vinegar.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Pour the sauce over the duck and serve.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Whole duck", quantity: "1" },
        { id: 2, text: "Oranges", quantity: "3" },
        { id: 3, text: "Sugar", quantity: "2 tbsp (30 g)" },
        { id: 4, text: "Vinegar", quantity: "2 tbsp" },
      ],
      userId: "stbUserId",
    },
    "6":{
      id: "6",
      name: "Coq au Vin",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Chicken slowly cooked in red wine with mushrooms and onions",
      steps: [
        { id: 1, text: "Brown the chicken pieces.", image: null },
        {
          id: 2,
          text: "Add red wine, mushrooms, onions, and simmer.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Rooster or chicken", quantity: "1" },
        { id: 2, text: "Red wine", quantity: "3 cups (750 ml)" },
        { id: 3, text: "Mushrooms", quantity: "9 oz (250 g)" },
        { id: 4, text: "Small onions", quantity: "7 oz (200 g)" },
        { id: 5, text: "Garlic", quantity: "4 cloves" },
        { id: 6, text: "Bouquet garni", quantity: "1" },
      ],
      userId: "stbUserId",
    },
    "7":{
      id: "7",
      name: "Cheese Soufflé",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A light and airy soufflé with Gruyère cheese",
      steps: [
        {
          id: 1,
          text: "Prepare the béchamel base and add grated cheese.",
          image: null,
        },
        {
          id: 2,
          text: "Fold in the beaten egg whites until stiff.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake in a preheated oven at 375°F (190°C) until puffed and golden.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Grated Gruyère", quantity: "5 oz (150 g)" },
        { id: 2, text: "Milk", quantity: "1 cup (250 ml)" },
        { id: 3, text: "Butter", quantity: "2 tbsp (30 g)" },
        { id: 4, text: "Flour", quantity: "2 tbsp (30 g)" },
        { id: 5, text: "Eggs", quantity: "4 (separated)" },
      ],
      userId: "stbUserId",
    },
    "8":{
      id: "8",
      name: "Chocolate Mousse",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A rich mousse made with dark chocolate and cream",
      steps: [
        {
          id: 1,
          text: "Melt the chocolate with a bit of butter.",
          image: null,
        },
        {
          id: 2,
          text: "Add the egg yolks and mix vigorously.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Gently fold in the whipped egg whites.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Dark chocolate", quantity: "7 oz (200 g)" },
        { id: 2, text: "Butter", quantity: "2 tbsp (30 g)" },
        { id: 3, text: "Eggs", quantity: "6 (separated)" },
        { id: 4, text: "Sugar", quantity: "1/2 cup (100 g)" },
      ],
      userId: "stbUserId",
    },
    "9":{
      id: "9",
      name: "Niçoise Salad",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A refreshing salad with tuna, olives, and hard-boiled eggs",
      steps: [
        {
          id: 1,
          text: "Prepare all ingredients and arrange in a large salad bowl.",
          image: null,
        },
        {
          id: 2,
          text: "Dress with olive oil, vinegar, salt, and pepper.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Canned tuna", quantity: "7 oz (200 g)" },
        { id: 2, text: "Cherry tomatoes", quantity: "5 oz (150 g)" },
        { id: 3, text: "Black olives", quantity: "2 oz (50 g)" },
        { id: 4, text: "Hard-boiled eggs", quantity: "4" },
        { id: 5, text: "Green beans", quantity: "5 oz (150 g)" },
        { id: 6, text: "Potatoes", quantity: "7 oz (200 g)" },
        { id: 7, text: "Lettuce", quantity: "1 head" },
        { id: 8, text: "Anchovies", quantity: "2 oz (50 g)" },
      ],
      userId: "stbUserId",
    },
    "10":{
      id: "10",
      name: "Filet Mignon in Pastry",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Filet mignon wrapped in puff pastry, served with a mushroom sauce",
      steps: [
        { id: 1, text: "Sear the filet mignon in a hot pan.", image: null },
        {
          id: 2,
          text: "Wrap the filet in puff pastry with foie gras and mushrooms.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake in the oven at 390°F (200°C) until the pastry is golden.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Filet mignon", quantity: "1.1 lbs (500 g)" },
        { id: 2, text: "Puff pastry", quantity: "1 roll" },
        { id: 3, text: "Foie gras", quantity: "3.5 oz (100 g)" },
        { id: 4, text: "Mushrooms", quantity: "3.5 oz (100 g)" },
        { id: 5, text: "Egg yolk", quantity: "1 (for glazing)" },
      ],
      userId: "stbUserId",
    },
    "11":{
      id: "11",
      name: "Beef Bourguignon",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Beef slow-cooked in red wine with mushrooms and bacon",
      steps: [
        { id: 1, text: "Brown the beef cubes in a heavy pan.", image: null },
        {
          id: 2,
          text: "Add red wine, mushrooms, onions, and bacon, then simmer slowly.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Beef chuck", quantity: "2 lbs" },
        { id: 2, text: "Red wine", quantity: "4 cups" },
        { id: 3, text: "Mushrooms", quantity: "8 oz" },
        { id: 4, text: "Bacon", quantity: "4 oz" },
        { id: 5, text: "Onions", quantity: "2 medium" },
        { id: 6, text: "Garlic", quantity: "3 cloves" },
        { id: 7, text: "Bouquet garni", quantity: "1" },
      ],
      userId: "stbUserId",
    },
    "12":{
      id: "12",
      name: "Quiche Lorraine",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A savory pie from Lorraine filled with bacon, cheese, and eggs",
      steps: [
        {
          id: 1,
          text: "Prepare the pastry crust and lay it in a pie dish.",
          image: null,
        },
        {
          id: 2,
          text: "Mix the bacon, cheese, and eggs and pour into the crust.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake until the filling is set and the crust is golden.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Pastry dough", quantity: "1" },
        { id: 2, text: "Bacon", quantity: "6 oz" },
        { id: 3, text: "Gruyère cheese", quantity: "4 oz" },
        { id: 4, text: "Eggs", quantity: "3" },
        { id: 5, text: "Heavy cream", quantity: "1 cup" },
      ],
      userId: "stbUserId",
    },
    "13":{
      id: "13",
      name: "French Onion Soup",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Rich and comforting soup topped with toasted bread and melted cheese",
      steps: [
        { id: 1, text: "Caramelize the onions slowly in butter.", image: null },
        {
          id: 2,
          text: "Add beef stock and simmer for richness.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Top with toasted bread and cheese, then broil until melted.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Onions", quantity: "6 large" },
        { id: 2, text: "Butter", quantity: "3 tbsp" },
        { id: 3, text: "Beef stock", quantity: "4 cups" },
        { id: 4, text: "Gruyère cheese", quantity: "6 oz" },
        { id: 5, text: "French bread", quantity: "4 slices" },
      ],
      userId: "stbUserId",
    },
    "14":{
      id: "14",
      name: "Raspberry Tart",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "A delightful dessert with fresh raspberries on a sweet pastry base",
      steps: [
        {
          id: 1,
          text: "Prepare the sweet pastry base and bake until lightly browned.",
          image: null,
        },
        {
          id: 2,
          text: "Arrange fresh raspberries on the cooled pastry.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Glaze with warmed apricot jam for a shiny finish.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Sweet pastry dough", quantity: "1" },
        { id: 2, text: "Fresh raspberries", quantity: "2 cups" },
        { id: 3, text: "Apricot jam", quantity: "1/2 cup" },
      ],
      userId: "stbUserId",
    },
    "15":{
      id: "15",
      name: "Gratin Dauphinois",
      image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
      memo: "Sliced potatoes baked in cream and garlic for a golden crust",
      steps: [
        {
          id: 1,
          text: "Slice potatoes thinly and layer in a buttered dish.",
          image: null,
        },
        {
          id: 2,
          text: "Mix cream, garlic, and nutmeg and pour over the potatoes.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
        {
          id: 3,
          text: "Bake until the potatoes are tender and the top is golden and bubbly.",
          image: "https://images.pexels.com/photos/26508136/pexels-photo-26508136.jpeg",
        },
      ],
      ingredients: [
        { id: 1, text: "Potatoes", quantity: "2 lbs" },
        { id: 2, text: "Heavy cream", quantity: "2 cups" },
        { id: 3, text: "Garlic", quantity: "2 cloves" },
        { id: 4, text: "Nutmeg", quantity: "a pinch" },
        { id: 5, text: "Butter", quantity: "to grease" },
      ],
      userId: "stbUserId",
    },
  };

  return new Promise<Recipe | null>((resolve) => {
    setTimeout(() => {
      if (recipes.hasOwnProperty(recipeId)) {
        console.log("レシピが見つかりました: ", recipes[recipeId].name);
        resolve(recipes[recipeId]);
      } else {
        console.log("レシピが見つかりませんでした");
        resolve(null);
      }
    }, 1000); // 1秒後にレスポンスを模擬
  });
};

/**
 * レシピデータの登録スタブ
 * @param userId ユーザーID
 * @param name レシピ名
 * @param ingredients 材料リスト
 * @param steps 手順リスト
 * @param memo メモ
 * @param image 画像URL
 * @returns 登録したレシピのIDを返します
 */
export async function saveRecipe(
  userId: string,
  name: string,
  ingredients: Ingredient[],
  steps: Step[],
  memo: string,
  image: string | null
): Promise<string> {
  console.log("レシピを保存しました:", name);
  // ランダムなIDを返しておく
  return `recipe_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * 指定されたレシピの削除スタブ
 * @param {string} recipeId 削除するレシピのドキュメントID
 */
export const deleteRecipe = async (recipeId: string): Promise<void> => {
  console.log("レシピを削除しました:", recipeId);
};
