# Architecture Contribution

## Author 

Lilly Adamo

#### Last Updated

02-03-2026

## Repositories

### What does it do?

`itemRepository` currently houses a set list of 10 items, a function to get the items, and a function to remove an item from the list. 

### Why was this logic included?

This logic was implemented because the repository's job is to simply store and retrieve data. No randomization logic was included because that is the service's job. 

### Where is it used?

The repository is used by the itemService, which calls the `getItems()` function to get the full list of items so the randomizer logic in the service layer can work. 

## Services

### What does it do?

The `itemServices` contains the code for the randomizer logic. This take the items from the repository, decides how many items will be dropped after a fight, and then randomizes which specific items are dropped.

### Why was this logic included?

Because the service layer handles the business rules, and its a rule that 2-3 items will drop, and a random assortment of items will drop, which is why this sits in the service layer.

### Where is it used?

We use the service layer in the hook. It's called when the hook initializes the `itemsDropped` state.

## Hooks

### What does it do?

`useDroppedItems` manages all the states for the battle complete screen. It contains the states for which items were dropped, which items the player selects to discard, which items actually get discarded, and the confirmation states. 

### Why was this logic included?

This logic goes into the hook because its good to separate the management logic and the UI. The hook now becomes reusable logic if another component should ever need it (which i think will be necessary at some point given the nature of our project) and the component is strictly used for the UI. 

### Where is it used?

The hook is used `battleComplete.tsx` screen where it's called by the `battleComplete()` function.

