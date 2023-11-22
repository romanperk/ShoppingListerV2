//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Text, Line, Button, DateTime } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column"
    }),

  header: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 15,
      paddingRight: 15,
    }),
};
//@@viewOff:css

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
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
    function handleDelete(event) {
      props.onDelete(new Utils.Event(props.item, event));
    }

    function handleUpdate(event) {
      props.onUpdate(new Utils.Event(props.item, event));
    }

    //@@viewOff:private

   //@@viewOn:render
   const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main());

   return (
     <Box {...elementProps}>
       <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
       <Button icon="mdi-update" onClick={handleUpdate} significance="subdued" tooltip="Update" />
       {props.item.name}
         <div>
           <Button icon="mdi-delete" onClick={handleDelete} significance="subdued" tooltip="Delete" />
         </div>
       </Text>
     </Box>
   );
   //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports

