import app from '../server';
import 'mocha'

before(function(done) {
    app.on('dbConnected', () => {
        done()
    })
});

describe("Root suite", function() {
    import('./auth/auth.spec');
    import('./users/users.spec');
    import('./websocket/websocket.spec');
    import('./users/friends.spec');
    import('./workshop/stories.spec');
    import('./workshop/maps.spec');
});

