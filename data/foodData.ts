// src/data/foodData.ts

export interface FoodEntry {
    id: string;
    foodName: string;
    category: string;
    date: string;
    quantity: string;
    calories?: string;
    notes?: string;
  }
  
  export const dummyFoodEntries: FoodEntry[] = [
    {
      id: '1',
      foodName: 'Apple',
      category: 'Snack',
      date: new Date('2024-10-20T09:30:00').toLocaleString(),
      quantity: '1',
      calories: '95',
      notes: 'A healthy snack before work.',
    },
    {
      id: '2',
      foodName: 'Chicken Caesar Salad',
      category: 'Lunch',
      date: new Date('2024-10-20T12:15:00').toLocaleString(),
      quantity: '1 serving',
      calories: '450',
      notes: 'Light lunch, added extra dressing.',
    },
    {
      id: '3',
      foodName: 'Espresso',
      category: 'Snack',
      date: new Date('2024-10-20T15:00:00').toLocaleString(),
      quantity: '1 shot',
      calories: '5',
    },
    {
      id: '4',
      foodName: 'Spaghetti Bolognese',
      category: 'Dinner',
      date: new Date('2024-10-19T19:30:00').toLocaleString(),
      quantity: '2 servings',
      calories: '700',
      notes: 'Used gluten-free pasta.',
    },
    {
      id: '5',
      foodName: 'Chocolate Cake',
      category: 'Dessert',
      date: new Date('2024-10-19T20:00:00').toLocaleString(),
      quantity: '1 slice',
      calories: '350',
      notes: 'Celebrated a friend’s birthday.',
    },
    {
      id: '6',
      foodName: 'Oatmeal with Blueberries',
      category: 'Breakfast',
      date: new Date('2024-10-20T08:00:00').toLocaleString(),
      quantity: '1 bowl',
      calories: '250',
      notes: 'Topped with honey and chia seeds.',
    },
    {
      id: '7',
      foodName: 'Grilled Salmon with Veggies',
      category: 'Dinner',
      date: new Date('2024-10-18T19:00:00').toLocaleString(),
      quantity: '1 plate',
      calories: '600',
      notes: 'Delicious and filling!',
    },
    {
      id: '8',
      foodName: 'Protein Shake',
      category: 'Snack',
      date: new Date('2024-10-20T16:30:00').toLocaleString(),
      quantity: '1 bottle',
      calories: '200',
      notes: 'Post-gym snack.',
    },
  ];
  