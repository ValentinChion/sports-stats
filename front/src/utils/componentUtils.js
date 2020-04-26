/**
 * Utils that produce Components
 */
import React from "react";
import { ResponsiveTreeMapHtml } from "@nivo/treemap";

const componentUtils = {
  createTreeMap: ({ root }, customTooltip, customName) => (
    <ResponsiveTreeMapHtml
      root={root}
      identity="name"
      value="loc"
      tile="binary"
      innerPadding={3}
      outerPadding={3}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      label={customName ? customName : function (e) {
        return <>{e.date} <br /> <strong>{e.toDisplay}</strong></>;
      }}
      orientLabel={false}
      labelSkipSize={12}
      labelTextColor="#FFF"
      colors={["#FFF", "#B87DE0", "#7F5DEF", "#4240ED"]}
      borderWidth={6}
      borderColor={{ from: "color" }}
      animate={true}
      motionStiffness={90}
      motionDamping={11}
      tooltip={customTooltip}
    />
  ),
};

export default componentUtils