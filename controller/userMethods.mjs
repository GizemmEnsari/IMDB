import User from "../model/User.mjs";

/* Get a user's profile */
export const userFetch = async (req, res) => {
    try {

        const id = req.user.id;
        const getUser = await User.findOne({ _id: id });


        if (getUser == null) {
            return res.status(400).json({ msg: `User with ID ${id} does not exist.` });
        } else {
            return res.status(200).json({ msg: `User with name ${getUser.firstName} ${getUser.lastName} ID is: ${getUser._id}` });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};



/* Admin access on user's profile */
export const adminUserFetch = async (req, res) => {
    try {

        const id = req.body.id;
        const getUser = await User.findOne({ _id: id });
        if (getUser == null) {
            return res.status(400).json({ msg: `User with ID ${id} does not exist.` });
        } else {
            return res.status(200).json({ msg: `User with name ${getUser.firstName} ${getUser.lastName} ID is: ${getUser._id}` });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const walletAmountFetch = async (req, res) => {

    try {
        const id = req.user.id;
        const getUser = await User.findOne({ _id: id });

        if (getUser == null) {
            return res.status(400).json({ msg: ` User with  ${id} does not exist.` });
        }
        else {
            return res.status(200).json({ msg: `User with name ${getUser.firstName} ${getUser.lastName} wallet amount is: ${getUser.walletAmount} ` });
        }
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }

}
