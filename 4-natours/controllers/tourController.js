const fs = require("fs");

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

exports.checkId = (req, res, next, val) => {
    console.log(`Tour id is ${val}`);

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid id"
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};
exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    });
};

exports.creatTour = (req, res) => {
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

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: "saccess",
        data: {
            tour: "Updated tour here..."
        }
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "saccess",
        data: null
    });
};