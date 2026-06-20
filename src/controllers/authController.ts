import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email";
import { db } from "../db/db";

const JWT_SECRET = process.env.JWT_SECRET!;



// REGISTER
export const register = async (req: any, res: any) => {
  console.log("REGISTER HIT");
  try {

    const { name, email, password } = req.body;


    const hashed = await bcrypt.hash(password, 10);


    await db.query(
      `
      INSERT INTO users
      (name,email,password)
      VALUES($1,$2,$3)
      `,
      [
        name,
        email,
        hashed
      ]
    );


    // IMPORTANT:
    // email sending works asynchronously
  const verifyToken = jwt.sign(
  { email },
  JWT_SECRET,
  { expiresIn: "1d" }
);

const verifyLink =
  `${process.env.FRONTEND_URL}/verify-email/${verifyToken}`;

await sendEmail(email, verifyLink);


    res.json({
      message: "User registered successfully"
    });


  } catch (error:any) {

    // UNIQUE INDEX handles duplicate email
    res.status(400).json({
      message: error.message
    });

  }

};




// LOGIN
export const login = async (req:any,res:any)=>{

 try {

  const {
    email,
    password
  } = req.body;



  const result = await db.query(
    `
    SELECT *
    FROM users
    WHERE email=$1
    `,
    [email]
  );


  const user = result.rows[0];


  if(!user){

    return res.status(404).json({
      message:"User not found"
    });

  }



  // IMPORTANT:
  // blocked user cannot login
  if(user.status==="blocked"){

    return res.status(403).json({
      message:"User is blocked"
    });

  }



  const match =
    await bcrypt.compare(
      password,
      user.password
    );


  if(!match){

    return res.status(401).json({
      message:"Invalid password"
    });

  }


console.log("Updating last login:", user.id);

  // IMPORTANT:
  // update last login time for sorting table
  await db.query(
    `
    UPDATE users
    SET last_login=CURRENT_TIMESTAMP
    WHERE id=$1
    `,
    [user.id]
  );



  const token = jwt.sign(
    {
      id:user.id
    },
    JWT_SECRET
  );



  res.json({
    token,
    user:{
      id:user.id,
      name:user.name,
      email:user.email,
      status:user.status
    }
  });



 } catch(error:any){

  res.status(500).json({
    message:error.message
  });

 }

};




// VERIFY EMAIL
export const verifyEmail = async (req: any, res: any) => {
  try {
    const { token } = req.params;

    const decoded: any = jwt.verify(
      token,
      JWT_SECRET
    );

    await db.query(
      `
      UPDATE users
      SET status='active'
      WHERE email=$1
      `,
      [decoded.email]
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/email-verified`
    );

  } catch (error) {
    res.status(400).send("Invalid verification link");
  }
};