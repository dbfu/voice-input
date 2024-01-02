import { Button, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState();
  const [voices, setVoices] = useState([]);

  const [loading, setLoading] = useState(false);

  async function getVoices() {
    // 获取声音，因为这个返回值不稳定，所以加了个定时器获取，保证能返回声音类型
    return new Promise(resolve => {
      const timer = setInterval(() => {
        const voices = window.speechSynthesis.getVoices();
        if (voices?.length) {
          resolve(window.speechSynthesis.getVoices());
          clearInterval(timer);
        }
      }, 30);
    })
  }

  useEffect(() => {
    // 获取声音，并设置给下拉框
    getVoices()
      .then(voices => {
        setVoices(voices);
      });
    
    return () => {
      window.speechSynthesis.cancel();
    }
  }, []);

  function click() {
    const synth = window.speechSynthesis;

    if (loading) {
      setLoading(false);
      synth.cancel();
      return;
    }

    const utterThis = new SpeechSynthesisUtterance();

    // 播放介绍
    utterThis.onend = () => {
      setLoading(false);
    }

    // 设置文本
    utterThis.text = text;
    // 设置语言
    utterThis.lang = 'zh-CN';
    // 设置声音类型
    utterThis.voice = voices.find(v => v.name === voice);
    // 开始播放
    synth.speak(utterThis);

    setLoading(true);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 200 }}>
      <Space.Compact style={{ width: 600 }}>
        <Select
          size='large'
          value={voice}
          options={voices}
          style={{ width: 200 }}
          onChange={(value) => setVoice(value)}
          fieldNames={{ label: 'name', value: 'name' }}
        />
        <Input
          size='large'
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button
          size='large'
          type="primary"
          onClick={click}
        >
          {loading ? '停止' : '播放'}
        </Button>
      </Space.Compact>
    </div>
  )
}

export default App
