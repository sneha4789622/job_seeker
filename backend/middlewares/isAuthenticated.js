import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
<<<<<<< HEAD
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
=======
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;