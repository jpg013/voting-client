import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import Results from '../../src/components/Results';
import {expect} from 'chai';

describe('results', () => {
    it('renders entries with vote counts or zero', () => {
        const pair = List.of('Trainspotting', '28 Days Later');
        const tally = Map({'Trainspotting': 5});
        const component = renderIntoDocument(
          <Results pair={pair} tally={tally}></Results>
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');

        const [train, days] = entries.map(e => e.textContent);
        expect(entries.length).to.equal(2);
        expect(train).to.contain('Trainspotting');
        expect(train).to.contain('5');
        expect(days).to.contain('28 Days Later');
        expect(days).to.contain('0');
    });

    it('invokes the next callback when the next button is clicked', () => {
        let nextInvoked = false;
        const next = () => nextInvoked = true;
        const pair = List.of('Trainspotting', '28 Days Later');
        const component = renderIntoDocument(
          <Results
              pair={pair}
              tally={Map()}
              next={next}>
          </Results>
        );
        var node = ReactDOM.findDOMNode(component.refs.next);
        Simulate.click(node);
        expect(nextInvoked).to.equal(true);
    });

    it('render the winner when there is one', () => {
        const pair = List.of('Trainspotting', '28 Days Later');
        const component = renderIntoDocument(
            <Results
              pair={pair}
              tally={Map()}
              winner='Trainspotting'>
            </Results>
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Trainspotting');
    });
});
