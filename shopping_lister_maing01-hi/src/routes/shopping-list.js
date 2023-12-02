//@@viewOn:imports
import { Utils, createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import PositionBar from "../core/position-bar.js";

import View from "../core/shopping-list-detail/view.js";
import { useThemeContext } from "../core/theme/theme-context.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      backgroundColor: "black"
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isDark] = useThemeContext();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div className={isDark ? Css.main() : undefined}>
      <div {...attrs}>
        <PositionBar />
        <div className={Config.Css.css({ padding: "16px 32px" })}>
          <View />
        </div>
      </div>
      </div>
    );
    //@@viewOff:render
  },
});

List = withRoute(List, { authenticated: true });

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
