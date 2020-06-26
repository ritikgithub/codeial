const development = {
    name:"development",
    static_files_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: "abdimaagmat@gmail.com",
            pass: "mujekyapata"
        }
    },
    google_oauth_clientID: "261878838975-3b2rqkra5c6mgnvil12km3ac8g1pnpjt.apps.googleusercontent.com",
    google_oauth_clientSecret: "ELO-Y6h87-wReFiSeTTCUyps",
    google_oauth_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial'

}

const production = {
    

}

module.exports = development;