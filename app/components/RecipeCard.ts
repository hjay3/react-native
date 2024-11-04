import { Observable, EventData, View } from '@nativescript/core';

export class RecipeCard extends Observable {
  constructor(private recipe: any) {
    super();
  }

  onFavoritePress(args: EventData) {
    const view = args.object as View;
    this.notify({
      eventName: 'favoritePress',
      object: view,
      recipe: this.recipe
    });
  }
}