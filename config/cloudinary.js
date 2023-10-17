const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function handleUpload(file){
    const res = await cloudinary.uploader.upload(file,{
        resource_type:"image",
        folder:"e-ease",
        height: 800,
        width: 800,
        crop: "fill",
        quality: "auto",
    })
    
    return res;
}

async function handleDelete(public_id){
    const res = await cloudinary.uploader.destroy(public_id);
    return res;
}


module.exports = {handleUpload, handleDelete};