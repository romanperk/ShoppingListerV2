//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState } from "uu5g05";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "./config/config.js";
//@@viewOff:imports

const NewListForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "NewListForm",
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
    const [open, setOpen] = useState();

    return (
      <Form {...elementProps} onSubmit={props.onSubmit}  open={open} >
        <FormText name="name" label="Název nákupního seznamu" required />
        <FormText name="owner" label="ID vlastníka" required />
        <FormText name="ownerName" label="Jméno vlastníka" required />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 8 }}>
          <SubmitButton  onClick={() => setOpen(false) }>Vytvořit seznam</SubmitButton>
        </div>
      </Form>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { NewListForm };
export default NewListForm;
//@@viewOff:exports
