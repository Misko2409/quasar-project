import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Pristup odbijen, nema tokena" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified; // Sprema korisnika iz tokena
        next();
    } catch (error) {
        res.status(400).json({ error: "Nevažeći token" });
    }
};

export default authMiddleware;
