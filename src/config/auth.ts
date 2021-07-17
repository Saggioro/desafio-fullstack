export default {
    jwt: {
        secret: process.env.APP_SECRET || "5e4c0cc6ff56b01f91f432052cc96b8b",

        expiresIn: "1d",
    },
};
