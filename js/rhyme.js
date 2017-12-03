import React from 'react';
import Relay from 'react-relay';

class Rhyme extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1>{this.props.rhyme.text}</h1>
                </div>
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

//the key piece of information from above is the rhyme --note the lowercase -- fragment.  This is fed into the list of rhymes mapped in app.js


export default Rhyme;

