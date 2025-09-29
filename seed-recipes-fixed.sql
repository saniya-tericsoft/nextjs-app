-- Recipes Seed Data for LifeSync Next.js App - FIXED VERSION
-- This script inserts sample recipe data using your actual user ID

-- First, let's get your user ID and insert recipes
WITH user_data AS (
  SELECT id as user_id FROM auth.users LIMIT 1
)
INSERT INTO public.recipes (id, user_id, title, ingredients, instructions, created_at, updated_at) 
SELECT 
  gen_random_uuid() as id,
  user_id,
  title,
  ingredients::jsonb,
  instructions,
  created_at,
  updated_at
FROM user_data
CROSS JOIN (
  VALUES 
    ('Classic Spaghetti Carbonara', 
     '[{"name": "Spaghetti", "amount": "400", "unit": "g"}, {"name": "Eggs", "amount": "4", "unit": "large"}, {"name": "Pancetta", "amount": "200", "unit": "g"}, {"name": "Parmesan cheese", "amount": "100", "unit": "g"}, {"name": "Black pepper", "amount": "1", "unit": "tsp"}, {"name": "Salt", "amount": "1", "unit": "tsp"}]',
     '1. Cook spaghetti according to package instructions. 2. Cut pancetta into small cubes and cook until crispy. 3. Beat eggs with grated parmesan and black pepper. 4. Drain pasta and immediately mix with pancetta. 5. Remove from heat and quickly stir in egg mixture. 6. Serve immediately with extra parmesan.',
     NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
    
    ('Chocolate Chip Cookies',
     '[{"name": "All-purpose flour", "amount": "2.25", "unit": "cups"}, {"name": "Butter", "amount": "1", "unit": "cup"}, {"name": "Brown sugar", "amount": "0.75", "unit": "cup"}, {"name": "White sugar", "amount": "0.5", "unit": "cup"}, {"name": "Eggs", "amount": "2", "unit": "large"}, {"name": "Chocolate chips", "amount": "2", "unit": "cups"}, {"name": "Vanilla extract", "amount": "2", "unit": "tsp"}, {"name": "Baking soda", "amount": "1", "unit": "tsp"}, {"name": "Salt", "amount": "1", "unit": "tsp"}]',
     '1. Preheat oven to 375°F (190°C). 2. Mix flour, baking soda, and salt in a bowl. 3. Cream butter and sugars until fluffy. 4. Beat in eggs and vanilla. 5. Gradually mix in flour mixture. 6. Fold in chocolate chips. 7. Drop rounded tablespoons onto ungreased baking sheets. 8. Bake 9-11 minutes until golden brown.',
     NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
    
    ('Mediterranean Quinoa Bowl',
     '[{"name": "Quinoa", "amount": "1", "unit": "cup"}, {"name": "Cherry tomatoes", "amount": "1", "unit": "cup"}, {"name": "Cucumber", "amount": "1", "unit": "medium"}, {"name": "Red onion", "amount": "0.5", "unit": "small"}, {"name": "Feta cheese", "amount": "100", "unit": "g"}, {"name": "Kalamata olives", "amount": "0.5", "unit": "cup"}, {"name": "Olive oil", "amount": "3", "unit": "tbsp"}, {"name": "Lemon juice", "amount": "2", "unit": "tbsp"}, {"name": "Fresh herbs", "amount": "2", "unit": "tbsp"}]',
     '1. Cook quinoa according to package instructions and let cool. 2. Dice tomatoes, cucumber, and red onion. 3. Crumble feta cheese. 4. Mix all ingredients in a large bowl. 5. Whisk olive oil and lemon juice for dressing. 6. Toss salad with dressing and fresh herbs. 7. Season with salt and pepper to taste.',
     NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
    
    ('Beef Stir Fry',
     '[{"name": "Beef sirloin", "amount": "500", "unit": "g"}, {"name": "Broccoli", "amount": "2", "unit": "cups"}, {"name": "Carrots", "amount": "2", "unit": "medium"}, {"name": "Bell peppers", "amount": "1", "unit": "large"}, {"name": "Garlic", "amount": "3", "unit": "cloves"}, {"name": "Ginger", "amount": "1", "unit": "tbsp"}, {"name": "Soy sauce", "amount": "3", "unit": "tbsp"}, {"name": "Sesame oil", "amount": "1", "unit": "tbsp"}, {"name": "Vegetable oil", "amount": "2", "unit": "tbsp"}]',
     '1. Slice beef thinly against the grain. 2. Cut vegetables into bite-sized pieces. 3. Heat vegetable oil in a large wok or pan. 4. Stir-fry beef until browned, then remove. 5. Add garlic and ginger, cook until fragrant. 6. Add vegetables and stir-fry until crisp-tender. 7. Return beef to pan. 8. Add soy sauce and sesame oil. 9. Toss everything together and serve immediately.',
     NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
    
    ('Homemade Pizza',
     '[{"name": "Pizza dough", "amount": "1", "unit": "ball"}, {"name": "Tomato sauce", "amount": "0.5", "unit": "cup"}, {"name": "Mozzarella cheese", "amount": "200", "unit": "g"}, {"name": "Pepperoni", "amount": "100", "unit": "g"}, {"name": "Bell peppers", "amount": "1", "unit": "medium"}, {"name": "Mushrooms", "amount": "100", "unit": "g"}, {"name": "Olive oil", "amount": "2", "unit": "tbsp"}, {"name": "Garlic powder", "amount": "1", "unit": "tsp"}, {"name": "Oregano", "amount": "1", "unit": "tsp"}]',
     '1. Preheat oven to 475°F (245°C). 2. Roll out pizza dough on a floured surface. 3. Brush with olive oil and add garlic powder. 4. Spread tomato sauce evenly. 5. Add mozzarella cheese. 6. Top with pepperoni, bell peppers, and mushrooms. 7. Sprinkle with oregano. 8. Bake for 12-15 minutes until crust is golden and cheese is bubbly.',
     NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
    
    ('Thai Green Curry',
     '[{"name": "Coconut milk", "amount": "400", "unit": "ml"}, {"name": "Green curry paste", "amount": "3", "unit": "tbsp"}, {"name": "Chicken breast", "amount": "500", "unit": "g"}, {"name": "Bell peppers", "amount": "2", "unit": "medium"}, {"name": "Bamboo shoots", "amount": "1", "unit": "can"}, {"name": "Thai basil", "amount": "1", "unit": "cup"}, {"name": "Fish sauce", "amount": "2", "unit": "tbsp"}, {"name": "Brown sugar", "amount": "1", "unit": "tbsp"}, {"name": "Jasmine rice", "amount": "2", "unit": "cups"}]',
     '1. Cook jasmine rice according to package instructions. 2. Cut chicken into bite-sized pieces. 3. Heat half the coconut milk in a large pot. 4. Add curry paste and cook until fragrant. 5. Add chicken and cook until nearly done. 6. Add remaining coconut milk, bell peppers, and bamboo shoots. 7. Simmer 10-15 minutes. 8. Season with fish sauce and brown sugar. 9. Garnish with Thai basil and serve over rice.',
     NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
    
    ('Vegetarian Buddha Bowl',
     '[{"name": "Sweet potatoes", "amount": "2", "unit": "medium"}, {"name": "Chickpeas", "amount": "1", "unit": "can"}, {"name": "Kale", "amount": "2", "unit": "cups"}, {"name": "Avocado", "amount": "1", "unit": "large"}, {"name": "Quinoa", "amount": "1", "unit": "cup"}, {"name": "Tahini", "amount": "3", "unit": "tbsp"}, {"name": "Lemon juice", "amount": "2", "unit": "tbsp"}, {"name": "Olive oil", "amount": "2", "unit": "tbsp"}, {"name": "Cumin", "amount": "1", "unit": "tsp"}]',
     '1. Preheat oven to 400°F (200°C). 2. Cube sweet potatoes and roast with olive oil and cumin for 25 minutes. 3. Cook quinoa according to package instructions. 4. Drain and rinse chickpeas, season with salt and pepper. 5. Massage kale with lemon juice and olive oil. 6. Make tahini dressing by mixing tahini, lemon juice, and water. 7. Assemble bowls with quinoa, roasted sweet potatoes, chickpeas, kale, and avocado. 8. Drizzle with tahini dressing.',
     NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
    
    ('Chicken Teriyaki',
     '[{"name": "Chicken thighs", "amount": "600", "unit": "g"}, {"name": "Soy sauce", "amount": "0.5", "unit": "cup"}, {"name": "Brown sugar", "amount": "3", "unit": "tbsp"}, {"name": "Rice vinegar", "amount": "2", "unit": "tbsp"}, {"name": "Garlic", "amount": "3", "unit": "cloves"}, {"name": "Ginger", "amount": "1", "unit": "tbsp"}, {"name": "Cornstarch", "amount": "1", "unit": "tbsp"}, {"name": "Sesame seeds", "amount": "1", "unit": "tbsp"}, {"name": "Green onions", "amount": "2", "unit": "stalks"}]',
     '1. Cut chicken into bite-sized pieces. 2. Mix soy sauce, brown sugar, rice vinegar, garlic, and ginger for marinade. 3. Marinate chicken for 30 minutes. 4. Cook chicken in a large pan until golden. 5. Add marinade and simmer until chicken is cooked through. 6. Mix cornstarch with water and add to thicken sauce. 7. Garnish with sesame seeds and green onions. 8. Serve over rice.',
     NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days')
) AS recipe_data(title, ingredients, instructions, created_at, updated_at);

-- Verification queries
SELECT 'Recipes' as table_name, COUNT(*) as record_count FROM public.recipes;
SELECT 'Sample Recipes:' as info;
SELECT id, user_id, title, created_at FROM public.recipes LIMIT 5;
