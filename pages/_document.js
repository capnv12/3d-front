import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        // Step 1: Create an instance of ServerStyleSheet
        const sheet = new ServerStyleSheet();

        // Step 2: Retrieve styles from components in the page
        const page = renderPage((App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        );

        // Step 3: Extract the styles as <style> tags
        const styleTags = sheet.getStyleElement();

        // Step 4: Pass styleTags as a prop
        return { ...page, styleTags };
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css" />
                    {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" /> */}
                    <link rel="stylesheet" href="/static/css/styles.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
