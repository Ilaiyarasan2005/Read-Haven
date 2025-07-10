const express = require("express");
const router = express.Router();
const URL = require("../models/URL");
const auth = require("../middleware/authMiddleware");

// Create a new URL
router.post("/", auth, async (req, res) => {
  const { urlLink, description, category } = req.body;

  try {
    const newURL = new URL({
      urlLink,
      description,
      category,
      user: req.user.id,
    });

    const url = await newURL.save();
    res.json(url);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all URLs for a user
router.get("/", auth, async (req, res) => {
  try {
    const urls = await URL.find({ user: req.user.id }).sort({ date: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a single URL by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const url = await URL.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ msg: "URL not found" });
    }

    // Make sure user owns the URL
    if (url.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    res.json(url);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a URL
router.put("/:id", auth, async (req, res) => {
  const { urlLink, description, category } = req.body;

  // Build URL object
  const urlFields = {};
  if (urlLink) urlFields.urlLink = urlLink;
  if (description) urlFields.description = description;
  if (category) urlFields.category = category;

  try {
    let url = await URL.findById(req.params.id);

    if (!url) return res.status(404).json({ msg: "URL not found" });

    // Make sure user owns the URL
    if (url.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    url = await URL.findByIdAndUpdate(
      req.params.id,
      { $set: urlFields },
      { new: true }
    );

    res.json(url);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a URL
router.delete("/:id", auth, async (req, res) => {
  try {
    const url = await URL.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ msg: "URL not found" });
    }

    // Make sure user owns the URL
    if (url.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await URL.findByIdAndRemove(req.params.id);

    res.json({ msg: "URL removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
