import jwt from "jsonwebtoken";
const secret = 'mysecretkey';
import { tokenBlacklist } from "../blacklist.mjs"; // import the tokenBlacklist set
export const isLogged = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }


        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.verify(token, secret);
        if (tokenBlacklist.has(decoded.jti)) {
            return res.status(401).json({ error: "Token has been invalidated" });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
