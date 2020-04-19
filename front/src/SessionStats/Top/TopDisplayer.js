import React from "react";
import NumbersInJSONDisplayer from "../../Components/NumbersInJSONDisplayer";

class TopDisplayer extends React.Component {
  state = {};

  render() {
    const { weightTrainingMaxs, runningMaxs } = this.props;
    return (
      <>
        <NumbersInJSONDisplayer title="MEILLEUR RÉPÉTITIONS EN UNE SÉANCE" numbers={weightTrainingMaxs} colorClassName="emphasize" />
        {runningMaxs && <NumbersInJSONDisplayer title="PLUS GRANDE DISTANCE" unit="km" numbers={runningMaxs.distances} colorClassName="emphasize" />}
        {runningMaxs && <NumbersInJSONDisplayer title="MEILLEUR TEMPS" units={["km", ""]} numbers={runningMaxs.byTime} areDoubleNumbers={true} colorClassName="emphasize" />}
      </>
    );
  }
}

export default TopDisplayer;
