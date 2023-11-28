//@@viewOn:imports
import { Utils, createVisualComponent, useState, useRoute, useMemo } from "uu5g05";
import Uu5Elements, { Modal } from "uu5g05-elements";
import { Form, FormText, SubmitButton } from "uu5g05-forms";

import { withRoute } from "uu_plus4u5g02-app";

import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";

import Tile from "./tile.js";

import { useUserContext } from "../user-list/user-context.js";
import { useShoppingListListContext } from "./shopping-list-list-context.js";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { loggedUser } = useUserContext();
    const { userShoppingList, handleCreate } = useShoppingListListContext();
    const [showOpenedOnly, setShowOpenedOnly] = useState(true);
    const [isCreateModalOpened, setIsCreateModalOpened] = useState();
    const [, setRoute] = useRoute();

    const filteredShoppingItemList = useMemo(() => {
      if (showOpenedOnly) {
        return userShoppingList.filter((shoppingList) => !shoppingList.archived);
      } else {
        return userShoppingList;
      }
    }, [userShoppingList, showOpenedOnly]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={props.dataList.data || []}>
        <Uu5Elements.Block
          header={"Přehled nákupních seznamů"}
          headerSeparator
          headerType={"title"}
          actionList={[
            { component: <Uu5TilesControls.SearchButton /> },
            {
              icon: "uugds-plus",
              children: "Vytvořit",
              colorScheme: "positive",
              significance: "highlighted",
              onClick: () => setIsCreateModalOpened(true),
            },
            {
              icon: showOpenedOnly ? "uugds-lock-closed" : "uugds-lock-open",
              children: showOpenedOnly ? "Zobrazit i archivované" : "Zobrazit pouze aktivní",
              colorScheme: "grey",
              significance: "highlighted",
              onClick: () => setShowOpenedOnly((current) => !current),
            },
            { icon: "uugds-reload", onClick: props.dataList.handlerMap.load },
          ]}
          footer={<Uu5TilesControls.Counter />}
          disabled={props.dataList.state.includes("pending")}
        >
          {isCreateModalOpened && (
            <Form.Provider
              onSubmit={(e) => {
                const id = Utils.String.generateId(4);
                handleCreate({ id, name: e.data.value.name, owner: loggedUser.id, memberList: [], itemList: [] });
                setIsCreateModalOpened(false);
                setRoute("shoppingListDetail", { id });
              }}
            >
              <Modal
                header={"Vytvořit nákupní seznam"}
                open={true}
                onClose={() => setIsCreateModalOpened(false)}
                footer={
                  <div style={{ float: "right" }}>
                    <SubmitButton />
                  </div>
                }
              >
                <FormText label={"Název"} name={"name"} required />
              </Modal>
            </Form.Provider>
          )}
          {props.dataList.state === "pendingNoData" && <Uu5Elements.Skeleton width="100%" height="200px" />}
          {(props.dataList.state === "pending" || props.dataList.state.includes("ready")) && (
            <div className={Config.Css.css({ position: "relative" })}>
          <Uu5TilesElements.Grid tileMinWidth={300} tileMaxWidth={400}>
            {Tile}
          </Uu5TilesElements.Grid>
          {props.dataList.state === "pending" && (
                <div
                  className={Config.Css.css({
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    right: "0",
                    left: "0",
                    opacity: "0.5",
                    background: "grey",
                    display: "flex",
                    justifyContent: "center",
                    alingItems: "center",
                  })}
                >
                  <Uu5Elements.Pending />
                </div>
              )}
            </div>
          )}
          {props.dataList.state.includes("error") && (
            <Uu5Elements.HighlightedBox colorScheme="negative">
              {props.dataList.errorData.toString()}
            </Uu5Elements.HighlightedBox>
          )}
        </Uu5Elements.Block>
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

View = withRoute(View, { authenticated: true });

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
