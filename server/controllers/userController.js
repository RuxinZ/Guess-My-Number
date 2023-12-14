import { db } from '../dbModels.js';
import bcrypt from 'bcryptjs';

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: 'userController.createUser',
      message: { err: 'No username or password entered' },
    });
  }

  try {
    //generate salt
    const salt = bcrypt.genSaltSync(10);
    //generate hash
    const hash = await bcrypt.hash(password, salt);
    const createNewUser = `
      INSERT INTO login_info (user_name, password, created_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      RETURNING user_id
    `;
    const newUserId = db.query(createNewUser, [username, hash]);
    res.locals.userID = newUserId;
    return next();
  } catch (err) {
    return next({
      log: 'userController.updateDB',
      message: {
        err: `ERROR finding user ${username}'s highest score in database: ${err}`,
      },
    });
  }
};

userController.getHighestScore = async (req, res, next) => {
  const { username } = req.params;
  try {
    const findHighestScore = `
      SELECT COALESCE(MAX(score), 0) AS highest_score
      FROM highest_scores
      JOIN login_info ON highest_scores.user_id = login_info.user_id
      WHERE login_info.user_name = $1;
    `;
    const result = await db.query(findHighestScore, [username]);
    console.log('RESULT', result);
    res.locals.highestScore = result.rows[0].highest_score;
    next();
  } catch (err) {
    return next({
      log: 'userController.updateDB',
      message: {
        err: `ERROR finding user ${username}'s highest score in database: ${err}`,
      },
    });
  }
};

userController.updateHighestScore = async (req, res, next) => {
  const { username, score } = req.params;
  try {
    const updateScore = `
      INSERT INTO highest_scores (create_at, score, user_id)
      VALUES (CURRENT_TIMESTAMP, $2, (SELECT user_id FROM login_info WHERE user_name = $1))
    `;
    db.query(updateScore, [username, score]);
    next();
  } catch (err) {
    return next({
      log: 'userController.updateDB',
      message: {
        err: `ERROR updating user ${username}'s highest score in database: ${err}`,
      },
    });
  }
};

export default userController;
