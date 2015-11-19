module.exports = {
    user: {
        getUser: function (req, res) {
            res.status(200).send('a user');
            res.end();
        }
    }
};
