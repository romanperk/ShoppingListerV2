//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import { useAlertBus, Button } from "uu5g05-elements";
import ListTile from "./list-tile.js";
import { useJokes } from "../list-context.js";
import { useState } from "uu5g05";
import ModalOnButton from "./new-list-modal";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css`
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: grid;

    .toggle-button {
      background-color: #f0f0f0;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 16px;
    }

    .list-tile {
      margin-bottom: 10px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .tile {
      display: grid;
      flex-direction: row;
      border: 1px solid #ccc;
      margin: 10px;
      padding: 10px;
      text-align: center;
    }
    .buttons {
      display: flex;
      margin-bottom: 10px;
      justify-content: center;
      flexDirection: column;
      gap: 10;
      @media (min-width: 768px): {
        flexDirection: row;
      }
    }
    .container {
      display: grid;
      grid-template-columns: 200px 200px 200px 200px 200px;
      grid-template-rows: 140px;
      grid-auto-flow: row;
    }
  `,
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListsView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { currentListId, selectList, getArchivedLists, getActiveLists } = useJokes();
    const { addAlert } = useAlertBus();
    const activeList = getActiveLists();
    const archivedList = getArchivedLists();
    const [showArchived, setShowArchived] = useState(false);

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function ArchivedButton(props) {
      return (
        <Button {...props}>
          {showArchived ? "Zobrazit aktivní seznamy" : "Zobrazit archivované seznamy"}
        </Button>
      );
    }

    function handleDelete(event) {
      const list = event.data.id;
      try {
        props.onDelete(list);
        addAlert({
          message: `The list ${event.data.listName} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListsView.logger.error("Error deleting list", error);
        showError(error, "List delete failed!");
      }
    }
    

    function handleUpdate(event) {
      const list = event.data;
      try {
        props.onUpdate(list.id);
        addAlert({
          message: `The list ${list.listName} has been archived.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Error archiving list", error);
        showError(error, "List archive failed!");
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const listsToDisplay = showArchived ? archivedList : activeList;
    const { create } = useJokes();
    return (
      <div {...attrs}>
        <div className="buttons">
          <ArchivedButton significance="subdued" colorScheme="primary" onClick={() => setShowArchived(!showArchived)} />
          <ModalOnButton header="Vytvořit seznam" onCreate={create}/>
        </div>
        <div className="container">
        {listsToDisplay.map((list) => (
          <div className="list-tile">
            <ListTile
              key={list.id}
              list={list}
              selectList={selectList}
              onUpdate={handleUpdate}
              selected={list.id === currentListId}
              onDelete={handleDelete}
              isArchived={showArchived}
            />
          </div>
        ))}
         </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsView };
export default ListsView;
//@@viewOff:exports
