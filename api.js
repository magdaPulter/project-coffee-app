const jsonServer = require('json-server');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { createReadStream } = require('fs');

const UPLOADS_DIR = 'database/files'
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, UPLOADS_DIR));
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage });

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(upload.any());

server.post('/files', (req, res) => {
  const file = req.files[0];
  const fileInfo = {
    id: uuidv4(),
    name: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  };
  router.db.get('files').push(fileInfo).write();

  res.status(201).json(fileInfo);
});

server.get('/files/:id', (req, res) => {
  const fileId = req.params.id;
  const file = router.db.get('files').find({ id: fileId }).value();

  if (file) {
    const filePath = path.join(__dirname, UPLOADS_DIR, file.name);
    const stream = createReadStream(filePath);
    stream.pipe(res);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is up and running');
});
