import upload from '../services/uploadMgmt';

export const uploadFile =   (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('upload success!');
    }

    })
};

// getting all users
export const deleteFile =  (req, res) => {
    try {
      res.json('the internet is forever');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
};
