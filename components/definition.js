/* eslint global-require: 0 */

const React = require('react');
const ImmutablePropTypes = require('react-immutable-proptypes');
const Component = require('react-pure-render/component');
const ObjectDefinitionTable = require('./objectDefinitionTable');

class Definition extends Component {

  static propTypes = {
    definitions: ImmutablePropTypes.map,
    contextId: React.PropTypes.string,
    fieldPointer: React.PropTypes.string,
  };

  renderDefTable(definitions) {
    const ObjectDefinitionTable = require('./objectDefinitionTable');
    return <ObjectDefinitionTable definitions={definitions} />;
  }

  render() {
    const { definitions } = this.props;
    console.log(definitions)

    return (
      <div>
        { this.renderDefTable(definitions) }
      </div>
    );
  }

}

module.exports = Definition;
