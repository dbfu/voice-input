import { AudioOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';

function App() {

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const recognition = useRef(new window.webkitSpeechRecognition())

  const lastLength = useRef(0);

  useEffect(() => {
    // 设置语言
    recognition.current.lang = 'zh';
    // 开启连续识别
    recognition.current.continuous = true;
    // 开启实时识别
    recognition.current.interimResults = true;

    function onresult(event) {
      // 这个事件会把前面识别的结果都返回回来，所以需要取最后一个识别结果
      const length = event.results.length;
      // 没有新的识别结果的时候，事件也会触发，所以这里判断一下如果没有新的识别结果，就不取最后一个识别结果了。
      if (lastLength.current === length) {
        return;
      }

      lastLength.current = length;

      console.log(event.results);

      // 获取最后一个识别结果
      const transcript = event.results[length - 1]?.[0]?.transcript;

      // 将最后一个识别结果添加到文本
      if (transcript) {
        setText(text => text + transcript);
      }
    }

    // 监听语音识别结果
    recognition.current.addEventListener('result', onresult)

    return () => {
      if (recognition.current) {
        recognition.current.removeEventListener('result', onresult)
      }
    }
  }, [])


  function click() {
    if (loading) {
      recognition.current.stop();
      setLoading(false);
      return;
    }
    setLoading(true);

    lastLength.current = 0;
    recognition.current.start();
  }

  const icon = useMemo(() => {
    if (loading) {
      return <LoadingOutlined style={{
        fontSize: 16,
        color: '#ffffff',
      }} />
    }
    return <AudioOutlined
      style={{
        fontSize: 16,
        color: '#ffffff',
      }}
    />
  }, [loading]);

  return (
    <div style={{ textAlign: 'center', marginTop: 200 }}>
      <Space.Compact style={{ width: 600 }}>
        <Input size='large' value={text} />
        <Button
          size='large'
          type="primary"
          onClick={click}
          icon={icon}
        />
      </Space.Compact>
     
    </div>
  )
}

export default App
