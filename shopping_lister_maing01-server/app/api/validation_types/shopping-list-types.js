/* eslint-disable */
// Display Shopping Lists (GET)
const shoppingListsListDtoInType = shape({});

// Display Items in a Shopping List (GET)
const shoppingListItemsListDtoInType = shape({
  listId: id().isRequired(),
});

// Create a New Shopping List (POST)
const shoppingListCreateDtoInType = shape({
  title: string(1, 255).isRequired(),
});

// Delete a Shopping List (DELETE)
const shoppingListDeleteDtoInType = shape({
  listId: id().isRequired(),
});

// Modify the Name of a Shopping List (PUT)
const shoppingListUpdateNameDtoInType = shape({
  listId: id().isRequired(),
  newName: string(1, 255).isRequired(),
});

// Archive a Shopping List (PUT)
const shoppingListArchiveDtoInType = shape({
  listId: id().isRequired(),
});

// Display a List of Archived Shopping Lists (GET)
const archivedShoppingListsListDtoInType = shape({});

// Add an Item to the Shopping List (POST)
const shoppingListItemCreateDtoInType = shape({
  listId: id().isRequired(),
  itemName: string(1, 255).isRequired(),
});

// Remove an Item from the Shopping List (DELETE)
const shoppingListItemDeleteDtoInType = shape({
  listId: id().isRequired(),
  itemId: id().isRequired(),
});

// Update the Status of an Item to "Resolved" (PUT)
const shoppingListItemResolveDtoInType = shape({
  listId: id().isRequired(),
  itemId: id().isRequired(),
});

// View "Resolved" Items (GET)
const resolvedShoppingListItemsListDtoInType = shape({
  listId: id().isRequired(),
});

// Display All Authorized Users for a Given List (GET)
const authorizedUsersListDtoInType = shape({
  listId: id().isRequired(),
});

// Create an Authorized User (POST)
const authorizedUserCreateDtoInType = shape({
  listId: id().isRequired(),
  userId: id().isRequired(),
});

// Delete an Authorized User (DELETE)
const authorizedUserDeleteDtoInType = shape({
  listId: id().isRequired(),
  userId: id().isRequired(),
});

// Delete Self from Authorized Users (DELETE)
const selfDeleteFromAuthorizedUsersDtoInType = shape({
  listId: id().isRequired(),
  userId: id().isRequired(),
});