import UuUnicorn from "uu_unicorn_maing01-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`UuUnicorn.Routes.Jokes`, () => {
  testProperties(UuUnicorn.Routes.Jokes, CONFIG);
});
