const fs = require("fs");
const express = require("express");
const app = express();
const morgan = require("morgan");

// 1) MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello From the Middleware");
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

// 2) ROUTE HANDLERS
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};
const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    // if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid Id"
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    });
};

const creatTour = (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    // console.log(req.query);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        "utf-8",
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    tour: newTour
                }
            });
        }
    );
};

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: "fail",
            message: "Invalid id"
        });
    }

    res.status(200).json({
        status: "saccess",
        data: {
            tour: "Updated tour here..."
        }
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: "fail",
            message: "Invalid id"
        });
    }

    res.status(204).json({
        status: "saccess",
        data: null
    });
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "this route is not yet defined!"
    });
};
const getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "this route is not yet defined!"
    });
};
const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "this route is not yet defined!"
    });
};
const updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "this route is not yet defined!"
    });
};
const deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "this route is not yet defined!"
    });
};
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", creatTour);
// app.patch(`/api/v1/tours/:id`, updateTour);
// app.delete(`/api/v1/tours/:id`, deleteTour);

// 3) ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
    .route("/")
    .get(getAllTours)
    .post(creatTour);

tourRouter
    .route("/:id")
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

userRouter
    .route("/")
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route("/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`Post is running on port ${port}`);
});
