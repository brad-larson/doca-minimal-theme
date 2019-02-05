const React = require('react');
const ObjectDefinitionTable = require('./objectDefinitionTable');
const MarkdownPreview = require('react-marked-markdown').MarkdownPreview;
const ImmutablePropTypes = require('react-immutable-proptypes');
const Component = require('react-pure-render/component');
const ExampleObject = require('./exampleObject');

class Schema extends Component {

  static propTypes = {
    schema: ImmutablePropTypes.map.isRequired,
  };

  render() {
    const { schema } = this.props;
    return (
      <article className="panel panel-primary">
        <div className="panel-heading">
          <div id={schema.get('html_id')} />
          <h2>{schema.get('title')}</h2>
        </div>
        <div className="panel-body">
          <h3>{schema.get('description')}</h3>
            <div>
              {schema.getIn(['object_definition', 'objects']).count() ?
                <div>
                  {schema.getIn(['object_definition', 'objects']).valueSeq().map((obj, index) =>
                    <div key={obj.get('title')}>
                      {obj.get('title') &&
                        <div>
                          <h4>{obj.get('title')}</h4>
                        </div>
                      }
                      {obj.get('example') && <ExampleObject example={obj.get('example')} />}
                      <ObjectDefinitionTable
                        definitions={obj.get('all_props')}
                        contextId={obj.get('title')}
                        fieldPointer={
                          '/' + schema.getIn(['object_definition', 'which_of']) +
                          '/' + index + '/properties'
                        }
                      />
                    </div>
                  )}
                </div>
              :
                <div>
                  {schema.getIn(['object_definition', 'example']) &&
                    <ExampleObject example={schema.getIn(['object_definition', 'example'])} />
                  }

                  <ObjectDefinitionTable
                    definitions={schema.getIn(['object_definition', 'all_props'])}
                    contextId={schema.getIn(['object_definition', 'title'])}
                    fieldPointer="/properties"
                  />
                </div>
              }
            </div>
        </div>
      </article>
    );
  }
}

module.exports = Schema;
