//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState } from "uu5g05";
import { Button, useAlertBus } from "uu5g05-elements";
import AddUserForm from "./add-user-form.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};
//@@viewOff:constants

//@@viewOn:helpers
function AddUserButton(props) {
  return (
    <Button {...props} colorScheme="primary" significance="highlighted">
      Přidej uživatele
    </Button>
  );
}
//@@viewOff:helpers

const AddUserView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddUserView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onCreate: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onCreate: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { addAlert } = useAlertBus();
    const [mode, setMode] = useState(Mode.BUTTON);

    function handleSubmit(event) {
      let user;

      try {
        user = props.onCreate(event.data.value);
      } catch (error) {
        // We pass Error.Message instance to the Uu5Forms.Form that shows alert
        throw new Utils.Error.Message("Přídání uživatele selhalo!", error);
      }

      addAlert({
        message: `Uživatel ${user.name} byl přidán.`,
        priority: "success",
        durationMs: 2000,
      });

      setMode(Mode.BUTTON);
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    switch (mode) {
      case Mode.BUTTON:
        return <AddUserButton {...elementProps} onClick={() => setMode(Mode.FORM)} />;
      default:
        return <AddUserForm {...elementProps} onSubmit={handleSubmit} onCancel={() => setMode(Mode.BUTTON)} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AddUserView };
export default AddUserView;
//@@viewOff:exports
