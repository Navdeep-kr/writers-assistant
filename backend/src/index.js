import app from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
const PORT = process.env.PORT || 4000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    console.log('👤 User connected:', socket.id);
    socket.on('join-document', (docId) => {
        socket.join(docId);
        console.log(`📄 Socket ${socket.id} joined document: ${docId}`);
    });
    socket.on('update-content', (data) => {
        // data: { docId, content, delta }
        socket.to(data.docId).emit('receive-update', data);
    });
    socket.on('cursor-move', (data) => {
        socket.to(data.docId).emit('receive-cursor', {
            userId: socket.id,
            ...data
        });
    });
    socket.on('disconnect', () => {
        console.log('👤 User disconnected:', socket.id);
    });
});
httpServer.listen(PORT, () => {
    console.log(`🚀 Premium Writers assistant Backend (with WebSockets) running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map