import React, { Component } from 'react';
import Show from './show'

class Shows extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': 'a7970fc9095e0bca9dc85a9255bc8b9c3d7ac7e120258ab85648ba1a99c89651'
    });

    const myInit = {
      method: 'GET',
      headers: myHeaders
    };

    fetch('https://api.trakt.tv/shows/watched/all', myInit)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>title</th>
              <th>year</th>
              <th>watcher_count</th>
              <th>play_count</th>
              <th>collected_count</th>
              <th>collector_count</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) =>
                <Show
                  key={index}
                  data={item}
                />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Shows;