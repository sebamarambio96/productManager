import { Router } from "express";
import { onlyAdmin } from "../controllers/profileControllers.js";
import { changeRole, deleteUser, getUser, getUsers, removeInactives, updateUser, uploadDocuments, uploadProfile } from "../controllers/usersControllers.js";
import multer from "multer";
import { uploadThumbnail } from "../controllers/productsController.js";

export const usersRouter = Router();

//Change role status
usersRouter.get("/premium/:uid", onlyAdmin, changeRole);

//Get all users basic information
usersRouter.get("/", getUsers);

//GET user by id
usersRouter.get("/:uid", onlyAdmin, getUser);

//UPDATE user info
usersRouter.put("/:uid", onlyAdmin, updateUser);

//DELETE user
usersRouter.delete("/:uid", onlyAdmin, deleteUser);

//Delete inactive users.
usersRouter.delete("/", removeInactives);

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";

        if (file.fieldname === "profiles") {
            folder = "profiles";
        } else if (file.fieldname === "products") {
            folder = "products";
        } else if (file.fieldname === "documents") {
            folder = "documents";
        }

        cb(null, `uploads/${folder}`);
    },
    filename: (req, file, cb) => {
        //Name of file is date + original filename
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Documents
usersRouter.post("/:uid/documents", upload.array("documents"), uploadDocuments);

// Profile Image
usersRouter.post("/:uid/profileImg", upload.single("profileImage"), uploadProfile);

// Products
usersRouter.post("/:pid/productImage", upload.array("productImage"), uploadThumbnail);
