import React from "react";
import componentUtils from "../../../../utils/componentUtils";
import Modal from "../../../../Components/Modal";
import moment from "moment";
import ChangeSession from "../ChangeSession/ChangeSession";

class ListSessionDisplayer extends React.Component {
  state = {};

  render() {
    const createTreeMap = componentUtils.createTreeMap;
    const { root, customToolTipTree, onClickTree, currSession } = this.props;

    let dateSession = undefined;
    if (currSession) {
      dateSession = moment(currSession.date);
    }
    return (
      <>
        {root && <div className="container-tree-map">{createTreeMap(root, customToolTipTree, onClickTree)}</div>}
        {currSession && <Modal name={dateSession.format("DD_MM_YYYY_HH:mm:SS")}
                               title={"Séance du " + dateSession.format("DD MMMM YYYY")}
                               content="Yolo" 
                               continueText="Modifier"
                               content={<ChangeSession session={currSession}/>}
                               stopText="Quitter"/>}
        {currSession && <label htmlFor={"modal_" + dateSession.format("DD_MM_YYYY_HH:mm:SS")} className="button">Show modal</label>}
      </>
    );
  }
}

export default ListSessionDisplayer;
