import passport from "passport";
import local from "passport-local"
import { usersManager } from "../dao/models/usersShema";
import { encryptPass, validPass } from "../utils/bcrypt";

const LocalStrategy = local.Strategy
