const clog = (req, res, next) => {
    const fgCyan = "\x1b[36m";
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