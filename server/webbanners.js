const express = require('express');
const router = express.Router();
const pool = require('./DataBase/db2');  // Import the connection pool
const multer = require('multer');

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload banner
router.post('/uploadbanner', upload.single('banner'), async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const banner = req.file.buffer;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO websvgbanners (banner) VALUES (?)',
      [banner]
    );
    connection.release();  // Release the connection back to the pool

    res.status(200).json({ message: 'Banner uploaded successfully', banner_Id: result.insertId });
  } catch (error) {
    console.error('Error uploading banner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/fetchbanners', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT banner_Id, banner FROM websvgbanners');
    connection.release();  // Release the connection back to the pool

    const banners = rows.map(row => ({
      banner_Id: row.banner_Id,
      banner: row.banner.toString('base64')
    }));

    res.status(200).json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update banner route
router.put('/updatebanner/:id', async (req, res) => {
    const { id } = req.params;
    const { banner } = req.body;
  
    if (!banner) {
      return res.status(400).json({ error: 'No banner data provided' });
    }
  
    const bannerBuffer = Buffer.from(banner, 'base64');
  
    try {
      const connection = await pool.getConnection();
      await connection.execute(
        'UPDATE websvgbanners SET banner = ? WHERE banner_Id = ?',
        [bannerBuffer, id]
      );
      connection.release();  // Release the connection back to the pool
  
      res.status(200).json({ message: 'Banner updated successfully' });
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
