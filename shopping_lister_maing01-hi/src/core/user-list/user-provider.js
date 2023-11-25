//@@viewOn:imports
import { createComponent, useState } from "uu5g05";
import UserContext from "./user-context";
import Config from "./config/config";

//@@viewOff:imports

const userList = [
  {
    id: "60639c3e",
    name: "Aragorn",
    img: "./assets/aragorn.png",
  },
  {
    id: "60639f0e",
    name: "Gandalf",
    img: "./assets/gandalf.png",
  },
  {
    id: "6063a47c",
    name: "Frodo",
    img: "./assets/frodo.png",
  },
  {
    id: "6063a5d0",
    name: "Smíšek",
    img: "./assets/merry.png",
  },
  {
    id: "8ef9a304",
    name: "Pipin",
    img: "./assets/pippin.png",
  },
  {
    id: "8ef9a700",
    name: "Samvěd",
    img: "./assets/samwise.png",
  },
  {
    id: "8ef9a8e0",
    name: "Legolas",
    img: "./assets/legolas.png",
  },
  {
    id: "8ef9aa98",
    name: "Gimli",
    img: "./assets/gimli.png",
  },
  {
    id: "ebd191c2",
    name: "Boromir",
    img: "./assets/boromir.png",
  },
];

export const UserProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [loggedUser, setLoggedUser] = useState(userList[0]);

    const value = {
      loggedUser,
      userList,
      setLoggedUser,
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <UserContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </UserContext.Provider>
    );
    //@@viewOff:render
  },
});

export default UserProvider;
