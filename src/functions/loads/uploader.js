const { getConfig } = require("../config/get");
const multer = require("multer");
let storage;
if (getConfig().imageUploader) {
    let imageUploader = getConfig().imageUploader;
    let normalizedStaticDir = getConfig().staticDir.replace(/^(\.\/|\/)?/, "");
    if (typeof imageUploader === "boolean" && imageUploader) {
        // Use the default storage
        storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, normalizedStaticDir);
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            },
        });
    } else {
        // Use the custom storage
        if (imageUploader.storageType === "disk") {
            storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(
                        null,
                        imageUploader.storagePath
                            ? imageUploader.storagePath
                            : normalizedStaticDir
                    );
                },
                filename: imageUploader.filename(req, file, cb)
                    ? imageUploader.filename(req, file, cb)
                    : function (req, file, cb) {
                          cb(null, file.originalname);
                      },
            });
        } else if (imageUploader.storageType === "memory") {
            storage = multer.memoryStorage();
        } else {
            throw new Error("Invalid storage type");
        }
    }
}

let uploader = multer({ storage: storage });

module.exports = { uploader };
