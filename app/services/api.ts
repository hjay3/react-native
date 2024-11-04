import axios from 'axios';
import { Recipe } from '../types/recipe';

const API_KEY = 'demo-key-123'; // Replace with actual Spoonacular API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const api = {
  async searchRecipes(query: string): Promise<Recipe[]> {
    try {
      const response = await axios.get(`${BASE_URL}/complexSearch`, {
        params: {
          apiKey: API_KEY,
          query,
          addRecipeInformation: true,
          number: 10
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching recipes:', error);
      return [];
    }
  },

  async getRecipeDetails(id: string): Promise<Recipe | null> {
    try {
      const response = await axios.get(`${BASE_URL}/${id}/information`, {
        params: {
          apiKey: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return null;
    }
  }
};