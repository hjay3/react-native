import { Observable } from '@nativescript/core';
import { api } from '../../services/api';

export class SearchViewModel extends Observable {
    private _recipes = [];
    private _isLoading = false;

    constructor() {
        super();
    }

    get recipes() {
        return this._recipes;
    }

    get isLoading() {
        return this._isLoading;
    }

    async onSearchSubmit(args) {
        const searchBar = args.object;
        const searchQuery = searchBar.text;

        this._isLoading = true;
        this.notifyPropertyChange('isLoading', true);

        try {
            this._recipes = await api.searchRecipes(searchQuery);
            this.notifyPropertyChange('recipes', this._recipes);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            this._isLoading = false;
            this.notifyPropertyChange('isLoading', false);
        }
    }

    onRecipeTap(args) {
        const recipe = this._recipes[args.index];
        // Navigate to details page
        const page = args.object.page;
        page.frame.navigate({
            moduleName: 'views/details/RecipeDetailsPage',
            context: { recipeId: recipe.id }
        });
    }
}