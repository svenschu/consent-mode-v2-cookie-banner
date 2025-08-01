import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../hello-world.js';

describe('HelloWorld', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture(html`<hello-world></hello-world>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture(html`<hello-world></hello-world>`);
    el.shadowRoot.querySelector('.content button').click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture(html`<hello-world header="attribute header"></hello-world>`);

    expect(el.header).to.equal('attribute header');
  });

  it('dispatches close event when close button is clicked', async () => {
    const el = await fixture(html`<hello-world></hello-world>`);

    let closeEventFired = false;
    el.addEventListener('close', () => {
      closeEventFired = true;
    });

    el.shadowRoot.querySelector('.close-button').click();

    expect(closeEventFired).to.be.true;
  });

  it('prevents propagation of clicks inside the modal', async () => {
    const el = await fixture(html`<hello-world></hello-world>`);

    // Create a mock event with stopPropagation method
    const mockEvent = {
      stopPropagation: () => {
        mockEvent.stopped = true;
      },
      stopped: false
    };

    // Call the preventPropagation method
    el.__preventPropagation(mockEvent);

    expect(mockEvent.stopped).to.be.true;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<hello-world></hello-world>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
