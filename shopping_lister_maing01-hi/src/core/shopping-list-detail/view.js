//@@viewOn:imports
import { createVisualComponent, useScreenSize, useRoute, useMemo } from "uu5g05";
import { Grid, PlaceholderBox } from "uu5g05-elements";

import { useShoppingListListContext } from "../shopping-list-list/shopping-list-list-context.js";
import { useUserContext } from "../user-list/user-context.js";

import ItemList from "./item-list.js";

import Config from "./config/config.js";
import MemberList from "./member-list.js"; 
import Chart from "./chart.js";
//@@viewOff:imports

//@@viewOn:constants
// TODO work 1h 45min
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      marginBottom: "10px"
    }),
  };
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { data: {} },
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    const [screenSize] = useScreenSize();
    const [route] = useRoute();
    const detailId = route.params.id;
    const { shoppingListList, handleUpdate, handleToggleState, handleDelete } = useShoppingListListContext();
    const { loggedUser } = useUserContext();

    const shoppingListDetail = useMemo(() => {
      return shoppingListList.find((shoppingList) => {
        return shoppingList.id === detailId;
      });
    }, [shoppingListList, detailId]);

    const isOwner = loggedUser.id === shoppingListDetail?.owner;
    const isMember =
      loggedUser.id === shoppingListDetail?.owner || shoppingListDetail?.memberList?.includes(loggedUser.id);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        {!shoppingListDetail && (
          <PlaceholderBox code={"forbidden"} header={"Nákupní seznam s uvedeným ID neexistuje"} />
        )}
        {shoppingListDetail && !isMember && (
          <PlaceholderBox code={"permission"} header={"Nejste členem zadaného nákupního seznamu"} />
        )}
        {shoppingListDetail && isMember && (
          <Grid alignItems={"start"} templateColumns={["xs", "s"].includes(screenSize) ? "100%" : "50% 40%"} rowGap={"30px"} columnGap={"50px"}>
            <ItemList
              {...{
                loggedUser,
                isOwner,
                shoppingListDetail,
                handleUpdate,
                handleToggleState,
                handleDelete,
              }}
            />
            <Chart {...{shoppingListDetail}}/>
            <MemberList {...{ loggedUser, isOwner, shoppingListDetail, handleUpdate }} />
          </Grid>
        )}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
