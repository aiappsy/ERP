import React, { useState } from 'react';
import { FloatButton, Drawer, Input, Button, List, Typography, Space, Avatar } from 'antd';
import { RobotOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function AIAgentPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'agent', text: 'Hello! I am your Aiappsy-ERP proactive assistant. How can I help you orchestrate your tasks today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    
    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessages(prev => [...prev, { type: 'agent', text: result.data }]);
      } else {
        setMessages(prev => [...prev, { type: 'agent', text: 'Sorry, I encountered an error. Please check the connection.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { type: 'agent', text: 'Network error communicating with the agent server.' }]);
    }
  };

  return (
    <>
      <FloatButton
        icon={<RobotOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24, width: 60, height: 60 }}
        onClick={() => setOpen(true)}
        badge={{ dot: true }}
      />
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RobotOutlined style={{ fontSize: '24px', color: '#1a73e8' }} />
            <span style={{ fontWeight: 600, fontSize: '18px' }}>Aiappsy-ERP Agent</span>
          </div>
        }
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={400}
        bodyStyle={{ display: 'flex', flexDirection: 'column', padding: '16px' }}
      >
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(msg, index) => (
              <List.Item style={{ borderBottom: 'none' }}>
                <List.Item.Meta
                  avatar={msg.type === 'agent' ? 
                    <Avatar style={{ backgroundColor: '#1a73e8' }} icon={<RobotOutlined />} /> : 
                    <Avatar icon={<UserOutlined />} />
                  }
                  title={<Text strong>{msg.type === 'agent' ? 'Workspace Agent' : 'You'}</Text>}
                  description={
                    <div style={{ 
                      padding: '12px 16px', 
                      backgroundColor: msg.type === 'agent' ? '#f8f9fa' : '#e8f0fe',
                      borderRadius: '8px',
                      color: '#202124',
                      marginTop: '4px'
                    }}>
                      {msg.text}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Ask the agent to perform a task..." 
            size="large"
            style={{ borderRadius: '24px' }}
          />
          <Button 
            type="primary" 
            shape="circle" 
            size="large" 
            icon={<SendOutlined />} 
            onClick={handleSend}
          />
        </div>
      </Drawer>
    </>
  );
}
