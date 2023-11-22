//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Text, Line, Button, DateTime, Icon } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const ItemResolvedTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ItemResolvedTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Box {...elementProps}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text category="interface" segment="title" type="minor" colorScheme="building" style={{ marginLeft: 50 }}>
            {props.item.name}
          </Text>
          <Box significance="distinct">
            <Icon icon="fa-check" style={{ fontSize: 40 }} />
          </Box>
        </div>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ItemResolvedTile };
export default ItemResolvedTile;
//@@viewOff:exports
