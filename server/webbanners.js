const express = require('express');
const router = express.Router();
const pool = require('./DataBase/db2');  // Import the connection pool
const multer = require('multer');

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/webdesigns', async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT design_Id, design FROM webdesigns');
      res.json(rows);
  } catch (error) {
      console.error('Error fetching design data:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Upload banner
router.post('/uploadbanner', upload.single('banner'), async (req, res) => {
  const { designId } = req.body;

  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const banner = req.file.buffer;

  try {
    const connection = await pool.getConnection();
    let result;

    if (designId == 1) {
      [result] = await connection.execute(
        'INSERT INTO websvgbanners (banner) VALUES (?)',
        [banner]
      );
    } else if (designId == 2) {
      [result] = await connection.execute(
        'INSERT INTO web_posters (web_poster_data) VALUES (?)',
        [banner]
      );
    } else {
      connection.release();
      return res.status(400).json({ error: 'Invalid design ID' });
    }

    connection.release(); // Release the connection back to the pool

    res.status(200).json({ message: 'Banner uploaded successfully', id: result.insertId });
  } catch (error) {
    console.error('Error uploading banner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Upload banner
// router.post('/uploadbanner', upload.single('banner'), async (req, res) => {
//   if (!req.file || !req.file.buffer) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   const banner = req.file.buffer;

//   try {
//     const connection = await pool.getConnection();
//     const [result] = await connection.execute(
//       'INSERT INTO websvgbanners (banner) VALUES (?)',
//       [banner]
//     );
//     connection.release();  // Release the connection back to the pool

//     res.status(200).json({ message: 'Banner uploaded successfully', banner_Id: result.insertId });
//   } catch (error) {
//     console.error('Error uploading banner:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

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


router.get('/fetchposters', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT web_poster_id, web_poster_data FROM web_posters');
    connection.release();  

    const posters = rows.map(row => ({
      web_poster_id: row.web_poster_id,
      web_poster_data: row.web_poster_data.toString('base64')
    }));

    res.status(200).json(posters);
  } catch (error) {
    console.error('Error fetching posters:', error);
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



  router.put('/updateposters/:id', async (req, res) => {
    const { id } = req.params;
    const { posters } = req.body;
  
    if (!posters) {
      return res.status(400).json({ error: 'No posters data provided' });
    }
  
    const posterBuffer = Buffer.from(posters, 'base64'); // Use `posters` from req.body
  
    try {
      const connection = await pool.getConnection();
      await connection.execute(
        'UPDATE web_posters SET web_poster_data = ? WHERE web_poster_id = ?',
        [posterBuffer, id]
      );
      connection.release();  // Release the connection back to the pool
  
      res.status(200).json({ message: 'Poster updated successfully' });
    } catch (error) {
      console.error('Error updating poster:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports = router;
