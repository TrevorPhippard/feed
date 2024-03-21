import uploaderService from '../services/fileUploader';
import Resource from '../models/resource.model';

export const uploadFile =   (req, res) => {
    if(!req.files){
        return res.status(200).send('file transfer failed');
    }else{
        uploaderService(req, res, (error) => {
            if (error) {
              res.status(500).send('Internal Server Error');
            } else {
              res.status(500).send(req.file.filename);
            }
        })
    }
};


export const addResource = (req, res) => {
    const { filename } = req.body
    Resource.create({filename})
        .then(savedResource => {
            const myOptions = { status: 200, statusText: savedResource.id };
            res.status(500).send(filename);
        })
        .catch(err => {
            const myOptions = { status: 500, statusText: err.message };
            new Response(myOptions)
        });
}

// getting all resource
export const getAllResources = async (req, res) => {
    try {
        const resource = await Resource.findAll();
        res.json(resource);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// Controller for getting a user by ID
export const getResourceById = async (req, res) => {
    try {
        const resourceId = req.params.id;

        const resource = await Resource.findAll({ id: resourceId });
        if (!resource) {
            res.status(404).send('resource not found');
        } else {
            res.json(resource);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// updating a user
export const updateResourceById = async (req, res) => {
    try {
        const fileId = Number(req.params.id.split(':')[1]);
        const { id, filename } = req.body;
        const file = await Resource.findByPk(fileId);
        if (!file) {
            res.status(404).send('file not found');
        } else {
                file.id = id,
                file.filename = filename,
                await file.save();
            res.json({ message: 'file updated successfully', file });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// deleting a user by ID
export const removeResource = async (req, res) => {

    try {
        const rescource = req.params.rescourceId.split(':')[1]
        const rescourceId = Number(rescource);

        const resource = await Resource.findByPk(rescourceId);
        if (!resource) {
            res.status(404).send('resource not found');
        } else {
            await resource.destroy();
            res.send('resource deleted successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};