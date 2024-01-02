import User from '../models/userModel.js';
import  ErrorResponse from '../utils/errorResponse.js';


export const signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("E-mail already registred", 400));
    }
    try {
        const user = await User.create(req.body);
        if(!user){
            return next(new ErrorResponse('user registration failed,please try again',400))
        }

        user.save();

        user.password=undefined;

        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }

    
}


export const signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        //validation
        if (!email) {
            return next(new ErrorResponse("please add an email", 403));
        }
        if (!password) {
            return next(new ErrorResponse("please add a password", 403));
        }

        //check user email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorResponse("invalid credentials", 400));
        }
        //check password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("invalid credentials", 400));
        }

        // Generating a JWT token
        const token = await user.getJwtToken();

        // Setting the password to undefined so it does not get sent in the response
        user.password = undefined;

        // Setting the token in the cookie with name token along with cookieOptions
        res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true });

        // If all good send the response to the frontend
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
        })

    } catch (error) {
        next(error);
    }
}

// log out
export const logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}

export const userProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
}