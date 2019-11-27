import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Select from './Select.jsx';

let data = [];
for (let i=1;i<10;i++) {
  data.push({label: `test${i}`, value: i});
}

ReactDOM.render(<Select isMultiSelect={true} data={data} selected=""/>, document.getElementById('root'));
