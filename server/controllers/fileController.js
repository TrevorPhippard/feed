
import upload from '../services/uploadMgmt';

export const uploadFile = async (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(req.body)
      res.send('upload success!');
    }
  })
};

// getting all users
export const deleteFile = async (req, res) => {
  try {
    res.json('the internet is forever');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

