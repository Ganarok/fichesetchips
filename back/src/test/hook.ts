import app from '../server';
import 'mocha'

before(function(done) {
    app.on('dbConnected', () => {
        done()
    })
});

describe("Root suite", function() {
    import('./auth/auth.spec');
});

