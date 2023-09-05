const clog = (req, res, next) => {
    switch (req.method) {
        case "GET": {
            break;
        }
        case "POST": {
            break;
        }
        default:
    }

    next();
};

exports.clog = clog;