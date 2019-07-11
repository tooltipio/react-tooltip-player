# react-tooltip-player
To go live and start displaying campaigns to users, you'll need to install Tooltip Player script on your site.

## Installation
```bash
npm i react-tooltip-player --save
```

## Usage
Inside of your application where you would be running Tooltip, insert `TooltipPlayer`:

NOTE! Parameters `projectId` and `API_KEY` are the same values and it's always required.

```js
import React from 'react';
import TooltipPlayer from 'react-tooltip-player';

export class App extends React.Component {

  render () {
    // optional params
    const userData = {
        userId: "123",
        email: "user@email.com"
    };

    return (
      <div className="app">
        <TooltipPlayer projectId="{API_KEY}" userData={userData} />
      </div>
    );
  }
}
```



#### API Usage
Player API is a developer interface to communicate your site's data to Tooltip. The API will help you set up custom triggers and personalize campaigns based on user data and actions.

Be sure to Install **Tooltip Player** on your site before using the API. 

```js
import { TooltipAPI } from 'react-tooltip-player';
TooltipAPI.show("campaign_id");
```


Find more information in our [Developer Documentation](https://tooltip.io/docs#apiDocsSection)