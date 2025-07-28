const urlModal = require("../modals/url.modal");
const userModal = require("../modals/user.modal");

exports.getUserLinks = async (req, res) => {
  try {
    const userId = req.user.id;

    const links = await urlModal.find({ owner: userId }).select("owner originalUrl shortCode");
    const user = await userModal.findById(userId).select("name email");
    // get owner details
    return res
      .status(200)
      .json({ success: true, count: links.length, data: links, user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUserLink = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    console.log(userId, id);

    const link = await urlModal.findOneAndDelete({ _id: id, user: userId });
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    if (link.user.toString() !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    return res.status(200).json({ success: true, data: link });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
