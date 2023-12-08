//@@viewOn:imports
import { Utils, createVisualComponent, useState, useRoute, useMemo, BackgroundProvider, Lsi } from "uu5g05";
import Uu5Elements, { Modal } from "uu5g05-elements";
import { Form, FormText, SubmitButton } from "uu5g05-forms";

import { withRoute } from "uu_plus4u5g02-app";

import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";

import Tile from "./tile.js";

import { useUserContext } from "../user-list/user-context.js";
import { useShoppingListListContext } from "./shopping-list-list-context.js";
import { useThemeContext } from "../theme/theme-context.js";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const Css = {
  main: () =>
    Config.Css.css({
      height: "80vh"
    }),
  };
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

  render() {
    //@@viewOn:private
    const { loggedUser } = useUserContext();
    const { userShoppingList, handleCreate } = useShoppingListListContext();
    const [showOpenedOnly, setShowOpenedOnly] = useState(true);
    const [isCreateModalOpened, setIsCreateModalOpened] = useState();
    const [, setRoute] = useRoute();
    const [isDark] = useThemeContext();

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
      <div className={Css.main()}>
      <Uu5Tiles.ControllerProvider data={filteredShoppingItemList || []}>
        <Uu5Elements.Block
          header={( <BackgroundProvider background={isDark ? "dark" : "light"}>
                    <Uu5Elements.Text category="story" segment="heading" type="h4" colorScheme={"building"}> 
                      <Lsi lsi={{ cs: "Přehled nákupních seznamů", en: "Shopping list summary"}}/> 
                    </Uu5Elements.Text>
                    </BackgroundProvider>)}
          headerSeparator
          headerType={"title"}
          actionList={[
            { component: <Uu5TilesControls.SearchButton /> },
            {
              icon: "uugds-plus",
              children: <Lsi lsi={{ cs: "Vytvořit", en: "Create"}}/> ,
              colorScheme: "positive",
              significance: "highlighted",
              onClick: () => setIsCreateModalOpened(true),
            },
            {
              icon: showOpenedOnly ? "uugds-lock-closed" : "uugds-lock-open",
              children: showOpenedOnly ? <Lsi lsi={{ cs: "Zobrazit i archivované", en: "Show with archived"}}/> : <Lsi lsi={{ cs: "Zobrazit pouze aktivní", en: "Show active only"}}/>,
              colorScheme: "grey",
              significance: "highlighted",
              onClick: () => setShowOpenedOnly((current) => !current),
            }
          ]}
          footer={<Uu5TilesControls.Counter />}
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
          <Uu5TilesElements.Grid tileMinWidth={300} tileMaxWidth={400}>
            {Tile}
          </Uu5TilesElements.Grid>
        </Uu5Elements.Block>
      </Uu5Tiles.ControllerProvider>
      </div>
    );
    //@@viewOff:render
  },
});

View = withRoute(View, { authenticated: true });

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
