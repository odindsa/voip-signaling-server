const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });

wss.on('connection', (ws) => {
  console.log('Новое подключение');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // Пересылаем сообщение всем клиентам
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error('Ошибка парсинга сообщения:', error);
    }
  });

  ws.on('close', () => {
    console.log('Подключение закрыто');
  });
});

console.log('WebSocket server running on port', process.env.PORT || 3000);
