import logo from './logo.svg';
import './App.css';
import { Select, Button } from 'antd';
import { useState } from 'react';
import cities from 'cities.json';

const { Option } = Select;
let timeout;
let currentValue;

const fetch = (value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  currentValue = value;

  const fake = () => {
    const a = [];
    console.log(cities[0].name);
    if (value) {
      cities.forEach((e, i) => {
        if (e.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) a.push({
          value: i,
          text: e.name
        })
      })
      callback(a.reverse())
    }
    else {
      callback(cities.map((e, i) => ({
        value: i,
        text: e.name
      })))
    }

  };

  timeout = setTimeout(fake, 300);
};

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  console.log(data);
  const options = data?.map((d) => <Option key={d.value}>{d.text}</Option>);
  return (
    <div className="App">
      <Select
        placeholder='nhap vao day...'
        showSearch
        value={value}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        style={{ width: '300px' }}
      >
        {options}
      </Select>
      <Button>search...</Button>
    </div>
  );
}

export default App;
