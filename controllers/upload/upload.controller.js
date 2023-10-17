const cloudinary = require('../../config/cloudinary');
const { handleUpload, handleDelete } = require('../../config/cloudinary')

const uploadController = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        const cldRes = await handleUpload(dataURI);
        res.status(200).json({
            success: true,
            message: "Uploaded",
            data: cldRes
        })
    }
    
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
}

const deleteContoller = async (req, res) => {
    const { public_id } = req.body;
    console.log(req.body)
    try{
        const cldRes = await handleDelete(public_id);

        res.status(200).json({
            success: true,
            message: "Deleted",
            data: cldRes
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
}


module.exports = {uploadController, deleteContoller};
