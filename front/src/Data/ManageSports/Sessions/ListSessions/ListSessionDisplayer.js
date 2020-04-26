import React from "react";
import componentUtils from "../../../../utils/componentUtils";

class ListSessionDisplayer extends React.Component {
  state = {};

  render() {
    const createTreeMap = componentUtils.createTreeMap;
    const { root, customToolTipTree } = this.props;

    return (
      <>
        <p>Tree map test</p>
        {root && <div className="container-tree-map">{createTreeMap(root, customToolTipTree)}</div>}
      </>
    );
  }
}

export default ListSessionDisplayer;
