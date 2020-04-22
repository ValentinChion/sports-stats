import React from "react";
import componentUtils from "../../../../utils/componentUtils";

class ListSessionDisplayer extends React.Component {
  state = {};

  render() {
    const createTreeMap = componentUtils.createTreeMap;
    /* const root = {
      "root": {
        "name": "sport",
        "children": [
          { "name": "test", "loc": 123 },
          { "name": "testdeux", "loc": 456 },
          { "name": "testtrois", "loc": 789 },
        ],
      },
    }; */
    const { root } = this.props;
    console.log(root)

    return (
      <>
        <p>Tree map test</p>
        {root && <div className="container-tree-map">{createTreeMap(root)}</div>}
      </>
    );
  }
}

export default ListSessionDisplayer;
