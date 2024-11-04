import { ApplicationSettings } from '@nativescript/core';

export const storage = {
  getFavorites(): string[] {
    const favorites = ApplicationSettings.getString('favorites');
    return favorites ? JSON.parse(favorites) : [];
  },

  addFavorite(recipeId: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(recipeId)) {
      favorites.push(recipeId);
      ApplicationSettings.setString('favorites', JSON.stringify(favorites));
    }
  },

  removeFavorite(recipeId: string): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== recipeId);
    ApplicationSettings.setString('favorites', JSON.stringify(updatedFavorites));
  }
};