import React from "react";
import NumbersInJSONDisplayer from "../../Components/NumbersInJSONDisplayer";

class TopDisplayer extends React.Component {
  state = {};

  render() {
    const { weightTrainingMaxs, runningMaxs } = this.props;
    return (
      <>
        <NumbersInJSONDisplayer title="MEILLEUR RÉPÉTITIONS EN UNE SÉANCE" numbers={weightTrainingMaxs} colorClassName="emphasize" />
        {runningMaxs && <NumbersInJSONDisplayer title="PLUS LONGUES SEANCES" unit="km" numbers={runningMaxs.distances} colorClassName="emphasize" />}
        {runningMaxs && <NumbersInJSONDisplayer title="MEILLEUR TEMPS" units={["km", "", "/ km"]} numbers={runningMaxs.byTime} areTripleNumbers={true} colorClassName="emphasize" />}
      </>
    );
  }
}

export default TopDisplayer;
