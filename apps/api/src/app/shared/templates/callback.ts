export const CALLBACK_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Callback Page</title>
  </head>
  <body>
    <p>Please wait...</p>
  </body>
  <script>
    window.addEventListener('message', (event) => {
      if (event.origin !== '<%= origin; %>') return;
      switch (event.data.type) {
        case 'auth-request': return postAccessToken(event);
        case 'close-window': return closeWindow();
        default: return;
      }
    }, false); 

    function postAccessToken(event) {
      const message = {
        type: 'auth-callback',
        payload: { accessToken: "<%= accessToken; %>" },
      };
      event.source.postMessage(message, event.origin);
    }

    function closeWindow() {
      window.close();
    }
  </script>
</html>`;