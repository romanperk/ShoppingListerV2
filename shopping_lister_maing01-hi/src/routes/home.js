//@@viewOn:imports
import { Utils, createVisualComponent, Content } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import { useJokes } from "../bricks/list-context.js";
import ListsView from "../bricks/shopping-list-summ/lists-view.js";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css`
    max-width: 1200px;
    margin: auto;
    display: grid;
    
    .create-list-view {
      margin-bottom: 24px;
      padding: 16px;
      border-bottom: 1px solid #ccc;
    }

    .lists-view {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `,
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    const { remove, update, create } = useJokes();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <h1 style={{ textAlign: 'center' }}>Přehled nákupních seznamů</h1>
        <div className={Css.main()}>  
          <div>
            <ListsView onDelete={remove} onUpdate={update} onCreate={create} />
          </div>
        </div>
      </>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
