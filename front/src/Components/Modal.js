import React from "react";

class Modal extends React.Component {
  state = {};

  render() {
    const { name, title, content, onClickContinue, continueText, onClickStop, stopText } = this.props;
    return (
      <div className="modal">
        <input id={"modal_" + name} type="checkbox" />
        <label htmlFor={"modal_" + name} className="overlay"></label>
        <article>
          <header>
            <h3>{title}</h3>
            <label htmlFor={"modal_" + name} className="close">
              &times;
            </label>
          </header>
          <section className="content">{content}</section>
          <footer>
            <button onClick={onClickContinue}>{continueText}</button>
            <label htmlFor={"modal_" + name} className="button dangerous">
              {stopText}
            </label>
          </footer>
        </article>
      </div>
    );
  }
}

export default Modal;
