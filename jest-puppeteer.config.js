module.exports = {
        launch: {
                args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox'
                ],
        },
        server: {
          command: 'npx vite',
          port: 3000,
        },
};
