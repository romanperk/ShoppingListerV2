//@@viewOn:imports
import { createComponent, useMemo, useEffect, useState, useDataList } from "uu5g05";
import Calls from "../../calls"
import ShoppingListListContext from "./shopping-list-list-context";
import { useUserContext } from "../user-list/user-context";
import Config from "./config/config";
//@@viewOff:imports

const INITIAL_VALUE = [
  {
    id: "cd8f0b48",
    name: "Kaufland",
    memberList: ["60639f0e", "8ef9a8e0"],
    itemList: [
      { id: "d1bce180", name: "Cukr" },
      { id: "d1bce48c", name: "Rohlíky (6)" },
      { id: "d1bce5d6", name: "Mouka", checked: true },
    ],
    owner: "60639c3e",
  },
  {
    id: "f4adaae0",
    name: "Hornbach",
    memberList: ["6063a47c", "8ef9aa98"],
    itemList: [
      { id: "d1bce70c", name: "Metr" },
      { id: "d1bce82e", name: "Hřebíky" },
      { id: "d1bce946", name: "Kladívko" },
    ],
    owner: "60639c3e",
  },
  {
    id: "f4adae28",
    name: "Drogerie",
    memberList: ["6063a47c", "8ef9a304", "8ef9a700"],
    itemList: [
      { id: "d1bcee1e", name: "Papírové kapesníčky" },
      { id: "d1bcef68", name: "Toaletní papír" },
      { id: "d1bcf080", name: "Deodorant" },
    ],
    owner: "6063a5d0",
  },
  {
    id: "f4adb08a",
    name: "Papírnictví",
    memberList: ["ebd191c2"],
    itemList: [
      { id: "d1bcf198", name: "Čtvrtka" },
      { id: "fb149276", name: "Čterečkovaný sešit", checked: true },
      { id: "fb1495d2", name: "Linkovaný sešit", checked: true },
      { id: "fb149c76", name: "Obaly na sešity", checked: true },
    ],
    owner: "8ef9a8e0",
  },
];

export const ShoppingListListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const dataList = useDataList({
      handlerMap: {
        load: handleLoad,
        loadNext: handleLoadNext,
        create: handleCreateList,
        deleteList: handleDeleteList,
        archiveList: handleArchiveList,
        updateName: handleUpdateListName,
      },
      itemHandlerMap: {
        createItem: handleCreateItem,
        deleteItem: handleDeleteItem,
        resolveItem: handleResolveItem
      },
      pageSize: 3,
    });

    const [shoppingListList, setShoppingListList] = useState(INITIAL_VALUE);

    const { loggedUser } = useUserContext();

    const userShoppingList = useMemo(() => {
      return shoppingListList.filter((shoppingList) => {
        return shoppingList.owner === loggedUser.id || shoppingList.memberList.includes(loggedUser.id);
      });
    }, [loggedUser, shoppingListList]);

    const value = {
      shoppingListList,
      userShoppingList,
      handleCreate: (dtoIn) => handleCreate(dtoIn, setShoppingListList),
      handleUpdate: (dtoIn) => handleUpdate(dtoIn, setShoppingListList),
      handleToggleState: (dtoIn) => handleToggleState(dtoIn, setShoppingListList),
      handleDelete: (dtoIn) => handleDelete(dtoIn, setShoppingListList),
    };

    //@@viewOnn:Calls
    function handleLoad(dtoIn) {
      return Calls.ShoppingList.list(dtoIn);
    }
    function handleLoadNext(dtoIn) {
      return Calls.ShoppingList.list(dtoIn);
    }
    function handleCreateList(values) {
      return Calls.ShoppingList.createList(values);
    }
    async function handleDeleteList(list) {
      const dtoIn = { id: list.id };
      return Calls.ShoppingList.delete(dtoIn, props.baseUri);
    }
    function handleUpdateListName(dtoIn) {
      return Calls.ShoppingList.updateListName(dtoIn);
    }
    function handleArchiveList(dtoIn) {
      return Calls.ShoppingList.archiveList(dtoIn);
    }
    function handleCreateItem(dtoIn) {
      return Calls.ShoppingList.createItem(dtoIn);
    }
    async function handleDeleteItem(item) {
      const dtoIn = { id: item.id };
      return Calls.ShoppingList.delete(dtoIn, props.baseUri);
    }
    function handleResolveItem(dtoIn) {
      return Calls.ShoppingList.resolveItem(dtoIn);
    }
    //@@viewOff:Calls
    
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ShoppingListListContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </ShoppingListListContext.Provider>
    );
    //@@viewOff:render
  },
});

function handleCreate(dtoIn, setShoppingListList) {
  setShoppingListList((current) => {
    const newSchoppingListList = current.slice();
    newSchoppingListList.push(dtoIn);
    return newSchoppingListList;
  });
}

function handleUpdate(dtoIn, setShoppingListList) {
  setShoppingListList((current) => {
    const newSchoppingListList = current.slice();
    const shoppingListIndex = newSchoppingListList.findIndex((item) => item.id === dtoIn.id);
    newSchoppingListList[shoppingListIndex] = dtoIn;
    return newSchoppingListList;
  });
}

function handleToggleState(dtoIn, setShoppingListList) {
  setShoppingListList((current) => {
    const newSchoppingListList = current.slice();
    const shoppingListIndex = newSchoppingListList.find((item) => item.id === dtoIn.id);
    dtoIn.archived = !dtoIn.archived;
    newSchoppingListList[shoppingListIndex] = dtoIn;
    return newSchoppingListList;
  });
}

function handleDelete(dtoIn, setShoppingListList) {
  setShoppingListList((current) => {
    const newSchoppingListList = current.slice();
    const index = newSchoppingListList.findIndex((item) => item.id === dtoIn.id);
    if (index >= 0) newSchoppingListList.splice(index, 1);
    return newSchoppingListList;
  });
}

export default ShoppingListListProvider;
