const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
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

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", creatTour);
// app.patch(`/api/v1/tours/:id`, updateTour);
// app.delete(`/api/v1/tours/:id`, deleteTour);

app.route("/api/v1/tours")
    .get(getAllTours)
    .post(creatTour);

app.route(`/api/v1/tours/:id`)
    .get(getAllTours)
    .patch(updateTour)
    .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`Post is running on port ${port}`);
});
