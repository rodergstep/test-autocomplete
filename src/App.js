import React from 'react';
import ReactAutocomplete from 'react-autocomplete';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      persons: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query={companyName}`
      )
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <ReactAutocomplete
          items={this.state.persons}
          shouldItemRender={(item, value) =>
            item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          getItemValue={item => item.name}
          renderItem={(item, highlighted) => (
            <div
              key={item.name}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
            >
              {item.name}
            </div>
          )}
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          onSelect={value => this.setState({ value })}
        />
      </div>
    );
  }
}

export default App;
