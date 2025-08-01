import { html, css, LitElement } from 'lit';

export class HelloWorld extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
      z-index: 1000;
      pointer-events: all; /* Capture all clicks */
    }

    .modal-container {
      background-color: white;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      position: relative;
      max-width: 80%;
      max-height: 80%;
      overflow: auto;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 5px;
      line-height: 1;
    }

    .content {
      margin-top: 10px;
    }
  `;

  static properties = {
    header: { type: String },
    counter: { type: Number },
    onClose: { type: Function },
  };

  constructor() {
    super();
    this.header = 'Hey there';
    this.counter = 5;
    this.onClose = () => {
      // Default close handler - can be overridden from outside
      this.dispatchEvent(new CustomEvent('close'));
    };
  }

  __increment() {
    this.counter += 1;
  }

  __close(e) {
    e.stopPropagation();
    this.onClose();
  }

  __preventPropagation(e) {
    e.stopPropagation();
  }

  render() {
    return html`
      <div class="modal-container" @click=${this.__preventPropagation}>
        <button class="close-button" @click=${this.__close}>×</button>
        <h2>${this.header} Nr. ${this.counter}!</h2>
        <div class="content">
          <button @click=${this.__increment}>increment</button>
          <slot></slot>
        </div>
      </div>
    `;
  }
}
