// all routing related to user
import express from "express";
import { getMyOrders, login, register } from "../services/userService";
import { ExtendRequest } from "../types/extendedRequests";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router(); //for endpoint creation for user

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    response.status(statusCode).json(data);
  } catch (err: any) {
    response.status(500).send("something went wrong ");
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password });
    response.status(statusCode).json(data);
  } catch (err: any) {
    response.status(500).send("something went wrong ");
  }
});

router.get('/my-orders', validateJWT, async (req: ExtendRequest , res)=>{
   try {
     const userId = req?.user?._id;
     const {statusCode, data} = await getMyOrders({ userId });
     res.status(statusCode).send(data);
   } catch {
     res.status(500).send("something went wrong ");
   }
})

export default router;
