import { Observable, NavigatedData } from '@nativescript/core';
import { api } from '../../services/api';
import { Recipe } from '../../types/recipe';

export class RecipeDetailsViewModel extends Observable {
  private _recipe: Recipe | null = null;
  private _isLoading = false;

  get recipe() {
    return this._recipe;
  }

  get isLoading() {
    return this._isLoading;
  }

  async onNavigatingTo(args: NavigatedData) {
    const page = args.object;
    const recipeId = page.navigationContext.recipeId;

    this._isLoading = true;
    this.notifyPropertyChange('isLoading', true);

    this._recipe = await api.getRecipeDetails(recipeId);
    
    this._isLoading = false;
    this.notifyPropertyChange('recipe', this._recipe);
    this.notifyPropertyChange('isLoading', false);
  }
}