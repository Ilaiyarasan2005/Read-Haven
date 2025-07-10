
const express = require('express');
const router = express.Router();

// Mock data for analytics
const yearlyData = [
    { year: '2020', users: 1200, books: 450, views: 8900 },
    { year: '2021', users: 1800, books: 720, views: 15400 },
    { year: '2022', users: 2400, books: 980, views: 22100 },
    { year: '2023', users: 3200, books: 1340, views: 31800 },
    { year: '2024', users: 4100, books: 1780, views: 42600 }
];

const monthlyData = [
    { month: 'Jan', users: 320, books: 145, views: 3200 },
    { month: 'Feb', users: 380, books: 167, views: 3800 },
    { month: 'Mar', users: 450, books: 189, views: 4500 },
    { month: 'Apr', users: 520, books: 201, views: 5100 },
    { month: 'May', users: 610, books: 234, views: 5900 },
    { month: 'Jun', users: 680, books: 267, views: 6700 }
];

const weeklyData = [
    { week: 'Week 1', users: 45, books: 12, views: 890 },
    { week: 'Week 2', users: 52, books: 15, views: 1020 },
    { week: 'Week 3', users: 48, books: 18, views: 950 },
    { week: 'Week 4', users: 67, books: 21, views: 1340 }
];

router.get('/stats', (req, res) => {
    res.json({ yearlyData, monthlyData, weeklyData });
});

module.exports = router;
