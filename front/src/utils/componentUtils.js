/**
 * Utils that produce Components
 */
import React from "react";
import { ResponsiveTreeMapHtml } from "@nivo/treemap";

const componentUtils = {
  createTreeMap: ({ root }, customTooltip) => (
    <ResponsiveTreeMapHtml
      root={root}
      identity="name"
      value="loc"
      tile="slice"
      innerPadding={3}
      outerPadding={3}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      label={function (e) {
        return e.name + "\n\n" + e.date;
      }}
      labelSkipSize={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
      colors={{ scheme: "purple_red" }}
      borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={11}
    />
  ),
};

export default componentUtils