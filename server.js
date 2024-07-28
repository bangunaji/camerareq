const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Konfigurasi multer untuk menyimpan file upload ke folder 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk menerima file upload
app.post('/upload', upload.single('photo'), (req, res) => {
  res.send('File uploaded successfully.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
