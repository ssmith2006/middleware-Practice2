function basicAuth(req, res, next){
    const base64 = req.headers.authorization ?.split("")[1];
    const decoded = Buffer.from(base64, `base64`).toString(`ascii`);
    const [username, password] = decoded.split(':')

    if (username === "ssmith1981" && password === "1234") {
        next();
    }else{
        res.status(401).json({
            message: "Invalid Credentials"
        })
    }
}
