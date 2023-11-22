import { Fragment, createVisualComponent, useState, PropTypes, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { useAlertBus } from "uu5g05-elements";
import NewListForm from "./new-list-form";
import Config from "./config/config.js";

const ModalOnButton = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "NewListView",
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
  
  render({ header, ...props }) {
    /*@@viewOn:example*/
    const [open, setOpen] = useState();
    const { addAlert } = useAlertBus();

      function handleSubmit(event) {
        try {
          props.onCreate(event.data.value.name, event.data.value.owner, event.data.value.ownerName);
        } catch (error) {
          // We pass Error.Message instance to the Uu5Forms.Form that shows alert
          throw new Utils.Error.Message("Vytvoření listu selhalo!", error);
        }
  
        addAlert({
          message: `Nákupní seznam ${event.data.value.name} byl vytvořen.`,
          priority: "success",
          durationMs: 2000,
        });
      }

    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Fragment>
        <Uu5Elements.Button significance="subdued" colorScheme="primary" onClick={() => setOpen(true)}>{header}</Uu5Elements.Button>
        <Uu5Elements.Modal {...elementProps} header={header} open={open} onSubmit={handleSubmit} onClose={() => setOpen(false) }>
          {elementProps.children || <NewListForm onSubmit={handleSubmit}/>}
        </Uu5Elements.Modal>
      </Fragment>
    );

    /*@@viewOn:example*/
  },
});

export { ModalOnButton};
export default ModalOnButton;