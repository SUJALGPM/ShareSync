const fileModel = require('../Models/FileModel');


// //Upload File Controller....
const uploadFileController = async (req, res) => {
    try {

        //Get the file attributes..
        const fileObjects = {
            path: req.file.path,
            name: req.file.originalname
        }

        //Create new file document..
        const newFile = new fileModel(fileObjects);
        await newFile.save();

        //Send complete path to get file...
        res.status(201).send({ path: `http://localhost:${process.env.PORT}/api/file/getFile/${newFile._id}` });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to post file for link conversion..!!", success: false });
    }
}



//Get File Controller....
const getFileController = async (req, res) => {
    try {
        //Get file Id through params...
        const fileID = req.params.fileId;

        //Check file exist or not...
        const fileExist = await fileModel.findById(fileID);

        if (fileExist.downloadCount < 5) {

            //Whenever file download using link we track...
            fileExist.downloadCount++;

            //Save Track usage data...
            fileExist.save();

            //Give downloaded file link...
            res.download(fileExist.path, fileExist.name);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to get converted downloaded file link...!!", success: false });
    }
}



module.exports = { uploadFileController, getFileController };