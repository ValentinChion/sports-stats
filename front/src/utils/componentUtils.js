/**
 * Utils that produce Components
 */
import React from "react";
import { ResponsiveTreeMapHtml } from "@nivo/treemap";
import { ResponsiveCalendar } from "@nivo/calendar";
import moment from "moment";

const componentUtils = {
  createTreeMap: ({ root }, customTooltip, onClick, customName) => (
    <ResponsiveTreeMapHtml
      root={root}
      identity="name"
      value="loc"
      tile="binary"
      innerPadding={6}
      outerPadding={6}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      label={
        customName
          ? customName
          : function (e) {
              return (
                <label htmlFor={e.session ? "modal_" + moment(e.session.date).format("DD_MM_YYYY_HH:mm:SS") : ""}>
                  {e.date} <br /> <strong>{e.toDisplay}</strong>
                </label>
              );
            }
      }
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
      onClick={onClick}
    />
  ),

  createCalendar: ({ data }) => {
    return (
      <ResponsiveCalendar
        data={data}
        from={data[data.length - 1].day}
        to={data[0].day}
        emptyColor="#E4DEF6"
        colors={["#B87DE0", "#9978F2", "#5747E2", "#3533D7", "#1936A0", "#052168", "#C18C5D"]}
        monthBorderColor="#FFFFFF"
        dayBorderWidth={2}
        dayBorderColor="#FFFFFF"
      />
    );
  },
};

export default componentUtils;
