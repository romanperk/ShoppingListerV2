//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "./config/config.js";
//@@viewOff:imports

const AddUserForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddUserForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Form {...elementProps} onSubmit={props.onSubmit}>
        <FormText name="name" label="Jméno uživatele" required />
        <FormText name="id" label="ID uživatele" required />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 8 }}>
          <CancelButton onClick={props.onCancel}>Zrušit</CancelButton>
          <SubmitButton>Přidej uživatele</SubmitButton>
        </div>
      </Form>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AddUserForm };
export default AddUserForm;
//@@viewOff:exports
