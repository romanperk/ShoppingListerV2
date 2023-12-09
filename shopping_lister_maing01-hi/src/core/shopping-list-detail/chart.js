//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Uu5ChartsBricks from "uu5chartsg01-bricks";
import Config from "./config/config.js";
import { Lsi } from "uu5g05";
//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Chart = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Chart",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { data: {} },
  //@@viewOff:defaultProps

  render( props ) {
    //@@viewOn:private
    const data = props.shoppingListDetail.itemList;
    const originalArray = Object.values(data);

    const transformedArray = originalArray.reduce(
    (result, currentItem) => {
      if (currentItem.checked) {
        result.checkedCount += 1;
      } else {
        result.uncheckedCount += 1;
      }
      return result;
    },
    { checkedCount: 0, uncheckedCount: 0 }
  );

  const finalArray = [
    { name: <Lsi lsi={{ cs: "Splněné", en: "Checked"}}/>, amount: transformedArray.checkedCount },
    { name: <Lsi lsi={{ cs: "Nesplněné", en: "Unchecked"}}/>, amount: transformedArray.uncheckedCount },
  ];
  console.log(finalArray)
    //@@viewOff:private

    //@@viewOn:render
    return (
        <div>
          <Uu5ChartsBricks.PieChart
                data = {[finalArray]}
                serieList={[
                    { valueKey: "amount", labelKey: "name" }
                ]}
                legend
            />
        </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Chart };
export default Chart;
//@@viewOff:exports
