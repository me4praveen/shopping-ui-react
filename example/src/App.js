import React, { Component } from 'react'

import { Header } from 'shopping-ui-library'
import 'bootstrap/dist/css/bootstrap.css';
export default class App extends Component {

  render () {
    const headerProps = {
      productFamily: "Client Technology",
      productName: "<Product Name>",
      tabs: [
        {
            "path" : "/",
            "exact": true,
            "title": "Home",
            "component": null,
            "type": "public"
        },
        {
            "path" : "/orders",
            "exact": true,
            "title": "Orders",
            "component": null,
            "type": "public"
        }
    ],
    rightTabs: [
      {
          "path" : "/",
          "exact": true,
          "title": "Home",
          "component": null,
          "type": "public"
      },
      {
          "path" : "/orders",
          "exact": true,
          "title": "Orders",
          "component": null,
          "type": "public"
      }
  ]
  
    }
    return (
      <div>
        <Header {...headerProps} />
        {/* App component */}
      </div>
    )
  }
}
