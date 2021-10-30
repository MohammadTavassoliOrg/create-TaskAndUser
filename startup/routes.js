module.exports = function (app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use("/api/auth", auth);
    app.use("/api/tasks", tasks);
    app.use(error)
};