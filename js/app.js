import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Rhyme from './rhyme';

class RhymesLibrary extends React.Component {
    render() {
        return (
            <div>
                {this.props.library.rhymesConnection.edges.map(edge => 
                    <Rhyme key={edge.node.id} rhyme={edge.node} />
                 )}
            </div>
        )
    }
}

RhymesLibrary = Relay.createContainer(RhymesLibrary, {
    fragments: {
        library: () => Relay.QL `
      fragment on RhymesLibrary {
        rhymesConnection(first: 1) {
          edges {
            node {
              id
              ${Rhyme.getFragment('rhyme')}
            }
          }
        }
      }
    `
    }
});

class AppRoute extends Relay.Route {
    static routeName = 'App';
    static queries = {
        library: (Component) => Relay.QL `
            query RhymesLibrary {
                rhymesLibrary {
                    ${Component.getFragment('library')}
                }
            }
        `
    }
}
//Component is the RhymesLibrary Component.

ReactDOM.render(
  <Relay.RootContainer
    Component={RhymesLibrary}
    route={new AppRoute()}
  />,
  document.getElementById('react')
);
