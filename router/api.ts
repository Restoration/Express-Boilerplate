import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyUser } from '../utils/utility';

const router = express.Router();
/*
 * Endpoint for Read
 *
 * You can get JSON Web Token in this endpoint
 *
 * expires time is 86400(24h)
 */
router.get('/', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'test',
    password: 'test',
    email: 'test@example.com'
  };

  jwt.sign({ user }, 'secretkey', { expiresIn: 86400 }, (_, token) => {
    res.json({
      message: 'Wellcome to API endpoint',
      token: token
    });
  });
});

/*
 * Endpoint for Create
 *
 *
 */
router.post('/create', verifyToken, (req, res) => {
  const result = verifyUser(req);
  if (result.sucess) {
    res.json(result);
  } else {
    // Error Handling
    res.json(result);
  }
});

/*
 * Endpoint for Update
 *
 *
 */
router.put('/update', verifyToken, (req, res) => {
  const result = verifyUser(req);
  if (result.sucess) {
    res.json(result);
  } else {
    // Error Handling
    res.json(result);
  }
});

/*
 * Endpoint for Delete
 *
 *
 */
router.delete('/delete', verifyToken, (req, res) => {
  const result = verifyUser(req);
  if (result.sucess) {
    res.json(result);
  } else {
    // Error Handling
    res.json(result);
  }
});

router.post('/create', verifyToken, (req, res) => {
  jwt.verify(req.body.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Created post',
        authData
      });
    }
  });
});

export default router;
