import React from 'react';
import Relay from 'react-relay';

class Rhyme extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.rhyme.text}</p>
      </div>
    );
  }
}

Rhyme = Relay.createContainer(Rhyme, {
    fragments: {
        rhyme: () => Relay.QL `
            fragment OneRhyme on Rhyme {
                text
            }
        `
    }
});

export default Rhyme;
