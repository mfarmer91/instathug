import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Rhyme from './rhyme';

class RhymesLibrary extends React.Component {
    render() {
        return (
            <div className="container">
                {this.props.library.allRhymes.map(rhyme => 
                    <Rhyme key={rhyme.id} rhyme={rhyme} />
                )}
            </div> 
        )
    }
}

RhymesLibrary = Relay.createContainer(RhymesLibrary, {
  fragments: {
    library: () => Relay.QL `
      fragment AllRhymes on RhymesLibrary {
        allRhymes {
          id
          ${Rhyme.getFragment('rhyme')}
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
