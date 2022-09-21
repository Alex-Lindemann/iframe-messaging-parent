* When running an app that could be used via both full page and iframe, there are a number of concerns to address.

  * Do you have navigation elements that you don't want to display when running in iframe, E.G. a common global nav that many apps use?
    * This could easily be addressed by something like routing.
    * E.G. If the path does not start with `/iframe`, then render the navigation along with the rest of the app. If the path does start with `/iframe`, do not render the navigation piece. React Router DOM allows for nested routes, so `<RestOfAppEntry />` could contain any necessary routes for the app. With this example, `/example/path` and `/iframe/example/path` would behave nearly identically except `/iframe/example/path` would not display the `<SimpleBottomNavigation />` component.

    ```javascript
    <Routes>
        <Route
            path="/*"
            element={<><SimpleBottomNavigation /><RestOfAppEntry /></>}
        />
        <Route
            path="/iframe/*"
            element={<RestOfAppEntry />}
        />
    </Routes>
    ```

  * Do you need to send data back to the calling app?
    * If running as a full page app, the app will likely redirect back to the calling app with some type of formatted URL containing the data.
    * If running in an iframe, the iframed app will send the data back to the calling app via `window.parent.postMessage`.
    * If using something like the routing example shown above, functions for sending back data could check the current pathname to conditionally redirect / postMessage to the calling app.

    ```javascript
    const sendToCallingApp = () => {
        if (window.location.pathname.startsWith('/iframe')) {
            window.parent.postMessage({ type: 'message-to-parent', fieldValues: data }, '*');
        } else {
            window.location.href = `${getReturnUrl())}?fieldValues=${encodeURIComponent(JSON.stringify(data))}`
        }
    }
    ```

  * [Example App](https://iframe-messaging-parent.herokuapp.com/) - May take some time to load if the app hasn't been accessed in the past 30 minutes by anyone.
