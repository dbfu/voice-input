import Input from './input.jsx';
import Voice from './voice.jsx';

import { Radio } from 'antd';

import { useState } from 'react';
export default function App() {

  const [type, setType] = useState('input');

  return (
    <div style={{ textAlign: 'center' }}>
      <Radio.Group buttonStyle='solid' value={type} onChange={e => setType(e.target.value)}>
        <Radio.Button value="input">语音识别</Radio.Button>
        <Radio.Button value="voice">文字播放</Radio.Button>
      </Radio.Group>
      {type === 'voice' && <Voice />}
      {type === 'input' && <Input />}
    </div>
  )
}