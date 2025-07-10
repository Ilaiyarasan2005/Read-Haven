const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    reading_stats: {
        booksRead: { type: Number, default: 0 },
        currentStreak: { type: Number, default: 0 },
        totalPages: { type: Number, default: 0 },
        favoriteGenre: { type: String, default: '' }
    },
    settings: {
        emailNotifications: { type: Boolean, default: true },
        readingReminders: { type: Boolean, default: true },
        publicProfile: { type: Boolean, default: true }
    }
});

module.exports = mongoose.model('User', userSchema);