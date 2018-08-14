import React from 'react';

const Show = ({ data }) => (
  <tr>
    <td>{data.show.title}</td>
    <td>{data.show.year}</td>
    <td>{data.watcher_count}</td>
    <td>{data.play_count}</td>
    <td>{data.collected_count}</td>
    <td>{data.collector_count}</td>
  </tr>
)

export default Show;