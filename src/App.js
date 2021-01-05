import React from "react";
import "./App.css";
import xml2js from "xml2js";
import axios from "axios";

class App extends React.Component {
    state = {
        isLoading: true,
        data: {},
    };

    getDust() {
        let ress = null;
        const API_KEY = process.env.REACT_APP_API_KEY;
        const url = `/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=244148.546388&tmY=412423.75772&ServiceKey=${API_KEY}`;
        console.log(url);
        var results;
        axios
            .get(url, { "Content-Type": "application/xml; charset=utf-8" })
            .then((response) => {
                let res2 = response.data;
                let parser = new xml2js.Parser();
                parser.parseString(res2, (err, result) => {
                    JSON.parse(JSON.stringify(result));
                    console.log(result);
                    // setState({ isLoading: false });
                });
                console.log(res2);
            });

        console.log(results);
    }

    componentDidMount() {
        this.getDust();
    }

    render() {
        const { isLoading, data } = this.state;

        return <div>HELLO!</div>;
    }
}

export default App;
