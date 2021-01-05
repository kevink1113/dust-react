import React from "react";
import "./App.css";
import Dust from "./Dust";
import axios from "axios";

class App extends React.Component {
    state = {
        isLoading: true,
        data: {},
    };

    getDust() {
        console.log(process.env.REACT_APP_GOOGLE_API_KEY);
        const API_KEY = process.env.REACT_APP_API_KEY;
        const url = `/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=송파구&dataTerm=month&pageNo=1&numOfRows=10&_returnType=json&ServiceKey=${API_KEY}&ver=1.3`;
        // console.log(url);
        axios.get(url).then((response) => {
            const data = response.data.list[0];
            console.log(data);

            this.setState({
                isLoading: false,
                data: data,
            });
        });
    }
    componentDidMount() {
        this.getDust();
    }

    render() {
        const { isLoading, data } = this.state;

        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader_text">Loading...</span>
                    </div>
                ) : (
                    <div className="dustInfo">
                        <Dust
                            date={data.dataTime}
                            pm10val={data.pm10Value}
                            pm10gr={data.pm10Grade}
                            pm25val={data.pm25Value}
                            pm25gr={data.pm25Grade}
                            o3val={data.o3Value}
                            o3gr={data.o3Grade}
                            coval={data.coValue}
                            cogr={data.coGrade}
                            no2val={data.no2Value}
                            no2gr={data.no2Grade}
                        />
                    </div>
                )}
            </section>
        );
    }
}

export default App;
