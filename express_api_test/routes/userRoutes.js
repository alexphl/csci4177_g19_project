import { Router } from "express";
import  {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    findUser
} from '../controllers/userController';

const router = Router();

// get all users
router.get('/', getUsers)

// get single user by id
//  ** Important ** keep this one before the other get or else it will be overwritten
router.get('/find/:email', findUser)

// get single user by id
router.get('/:id', getUser)

// create a user
router.post('/', createUser)

// delete a user by id
router.delete('/:id',deleteUser)

// update a user by id
router.patch('/:id', updateUser)

export default router;
