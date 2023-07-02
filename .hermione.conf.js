module.exports = {
    sets: {
        desktop: {
            files: "test/hermione",
        },
    },

    browsers: {
        chromeDesktop: {
            automationProtocol: "devtools",
            screenshotDelay: 100,
            desiredCapabilities: {
                browserName: "chrome",
            },
        },
    },
    plugins: {
        "html-reporter/hermione": {
            enabled: true,
        },
    },
};
