const Router = require("express-promise-router");

const { register, login, getUserData, deleteUser, updateUser } = require("../controllers/user");
const validation = require("../middleware/validation");
const auth = require("../middleware/auth");
const authValidator = require("../validation/user");

const router = Router({ mergeParams: true });
const { registerSchema, loginSchema } = authValidator;

/**
 * Handle POST to /api/v1/users/register route.
 */
router.post("/register", validation(registerSchema, "body"), register);

/**
 * Handle POST to /api/v1/users/login route.
 */
router.post("/login", validation(loginSchema, "body"), login);

/**
 * Handle GET to /api/v1/users/ route.
 */
router.get("/", auth, getUserData);

/**
 * Handle Delete to /api/v1/users/ route.
 */
 router.delete("/", auth, deleteUser);

/**
 * Handle Put to /api/v1/users/ route.
 */
 router.put("/", auth, updateUser);

module.exports = router;
