const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const drive = google.drive({ version: 'v3', auth: oauth2Client });

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    oauth2Client.setCredentials({ access_token: token });
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/api/drive/save', verifyToken, async (req, res) => {
  try {
    const { content, title, expiryDate, productDetails } = req.body;
    let folderId = await getOrCreateWarrantiesFolder();

    const metadata = {
      title,
      expiryDate,
      ...productDetails
    };

    const doc = await drive.files.create({
      requestBody: {
        name: title,
        mimeType: 'application/vnd.google-apps.document',
        parents: [folderId],
        properties: metadata
      },
      media: {
        mimeType: 'text/plain',
        body: content
      }
    });

    res.json({ id: doc.data.id, name: doc.data.name });
  } catch (error) {
    console.error('Error saving to Drive:', error);
    res.status(500).json({ error: 'Failed to save document' });
  }
});

app.get('/api/drive/warranties', verifyToken, async (req, res) => {
  try {
    const folderId = await getOrCreateWarrantiesFolder();
    
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, properties, modifiedTime)',
      orderBy: 'modifiedTime desc'
    });

    const warranties = response.data.files.map(file => ({
      id: file.id,
      title: file.name,
      expiryDate: file.properties?.expiryDate,
      productName: file.properties?.productName,
      modifiedTime: file.modifiedTime
    }));

    res.json({ warranties });
  } catch (error) {
    console.error('Error fetching warranties:', error);
    res.status(500).json({ error: 'Failed to fetch warranties' });
  }
});

async function getOrCreateWarrantiesFolder() {
  try {
    const response = await drive.files.list({
      q: "name='Warranties' and mimeType='application/vnd.google-apps.folder'",
      fields: 'files(id)'
    });

    if (response.data.files.length > 0) {
      return response.data.files[0].id;
    }

    const folder = await drive.files.create({
      requestBody: {
        name: 'Warranties',
        mimeType: 'application/vnd.google-apps.folder'
      },
      fields: 'id'
    });

    return folder.data.id;
  } catch (error) {
    console.error('Error with Warranties folder:', error);
    throw error;
  }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});