require('dotenv').config({ silent: true });

const
    http = require('http'),
    cors = require('cors'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    apiRoute = require('./routes/api.js'),
    db = require('./models'),
    config = require('./config.json')[process.env.NODE_ENV],

    server = express(),
    host = process.env.HOST || 'https://localhost',
    port = process.env.PORT || 8000;

server.set('token_secret', config.token_secret);

db.sequelize.sync().then(() => {
    server
        .use(cors({
            origin: '*',
            methods: ['GET, POST, OPTIONS, DELETE, PUT'],
            allowHeaders: 'content-type, accept',
            credentials: true,
            maxAge: 10,
        }))
        .use(morgan('dev'))
        .use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
        .use(bodyParser.json({ limit: '50mb' }))
        .use((req, res, next) => {
            /* redirect http request to https */
            if (process.env.NODE_ENV !== 'development' && (req.get('X-Forwarded-Proto') === 'http')) {
                res.redirect(`https://${req.get('Host')}${req.url}`);
            } else {
                next();
            }
        })
        /* serve static files in the given directory */
        // .use(express.static(`${__dirname}'/../../build`))

        /* token verification, uncomment to enable. Use `jsonwebtoken` package. */
        // .use((req, res, next) => {
        //     const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //     if (token) {
        //         jwt.verify(token, server.get('token_secret'), (err, decoded) => {
        //             if (err) {
        //                 return res.status(401).json({
        //                     message: 'Failed to authenticate token',
        //                     errorCode: errorCodes.ERROR_CODE_E5000,
        //                     error: err,
        //                 });
        //             }

        //             if (!(decoded && decoded.id)) {
        //                 return res.status(401).json({
        //                     message: 'token did not resolve to a user',
        //                     errorCode: errorCodes.ERROR_CODE_E5100,
        //                 });
        //             }

        //             req.decoded = decoded;
        //             next();
        //         });
        //     } else if (
        //         req._parsedUrl.pathname === '/api/signup' ||
        //         req._parsedUrl.pathname === '/api/signin' ||
        //         req._parsedUrl.pathname === '/api/share' ||
        //         req._parsedUrl.pathname === '/api/validate-signup' ||
        //         req._parsedUrl.pathname === '/api/validate-beta-signup' ||
        //         req._parsedUrl.pathname === '/api/validate-invitation' ||
        //         req._parsedUrl.pathname === '/api/waitlist-sign-up' ||
        //         req._parsedUrl.pathname === '/api/sign-up-waitlist-validate' ||
        //         !req.url.includes('/api/')
        //     ) {
        //         next();
        //     } else {
        //         return res.status(403).json({
        //             message: 'No token provided',
        //             errorCode: errorCodes.ERROR_CODE_E5200,
        //         });
        //     }
        // })
        .use(apiRoute);

    http.createServer(server).listen(port);

    /* control flow to run dev server on https. Use `fs` and `https` packages. */
    // if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
    //     http.createServer(server).listen(port);
    // } else {
    //     const
    //         privateKey  = fs.readFileSync(`${__dirname}/sslcert/server.key`, 'utf8'),
    //         certificate = fs.readFileSync(`${__dirname}/sslcert/server.crt`, 'utf8'),
    //         credentials = { key: privateKey, cert: certificate };

    //     https.createServer(credentials, server).listen(port);
    // }

    console.log(`Server listening on ${host} : ${port}\n`);
});
