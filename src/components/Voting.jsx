import React from 'react';

export default React.createClass({
  getPair: function() {
    return this.props.pair || [];
  },

  onClick: function(entry) {
      debugger;
      return this.props.vote ? this.props.vote(entry) : undefined;
  },

  render: function() {
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry} onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
        </button>
      )}
    </div>;
  }
});
