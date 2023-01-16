import react , {useState, useEffect} from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Chart(props: any){

    const today = new Date();
    // const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateString = month  + '.' + day + '.';
    const series2 = props.data;    //App.js에서 데이터를 보내줄 예정
    const options = {
        chart: {
            type: 'spline',		// bar차트. 아무 설정이 없으면 line chart가 된다.
            height: '235px'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ['09.24.','09.25.','09.26.','09.27.','09.28.','09.29.','09.30.','10.01.','10.02.','10.03.','10.04.','10.05.','10.06.','10.07.','10.08.','10.09.','10.10.','10.11.','10.12.','10.13.','10.14.','10.15.','10.16.','10.17.','10.18.','10.19.','10.20.','10.21.','10.22.','10.23.', dateString],
        },
        yAxis: {
            title: {
                text: ''
            },
            gridLineDashStyle: 'dot',
            gridLineColor: '#dfe5e7',
        },
        legend: {
            enabled: false
        },
        tooltip : {
            borderColor: '#999999',
            // pointFormat: '<span style="color:red">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
            formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                var x = '<div style="font-weight:600; font-size: 12px; color: #666666;">' + this.x + '</div><br>';
                var y = '<p style="font-weight:600; font-size: 18px; color: #40c65a;">' + this.y + '</p>';
                var unit = '<p style="font-weight:300; font-size: 12px; color: #888888;"> 건</p>'
                return  x + y + unit ;
            }
        },
        plotOptions: {
            series: {
                color : '#40c65a'
            }
        },
        series: [{
            name: "",
            data: series2
        }]


    }


    // const initialOptions: any = {
    //     title : { text : "example" },
    //     chart : { type : "pie" },
    //     series : [] // 데이터가 처음엔 비어았다.
    // };  
    // const [ options, setOptions ] = useState<any>(initialOptions);

    // const asyncRequest = async ()=>{
    //     const result = await asyncRequest(); 
    //     // 임의의 비동기 요청이 있다고 가정한다.
    //     // result의 data안에는 text라는 문자열과, value라는 값이 저장되어있다고 가정

    //     let tempSeries:any = [];
    //     result.data.forEach(item => tempSeries.push({
    //         name : item.text,   // 요소의 이름
    //         y: item.value       // 값 
    //     }));

    //     // 옵션을 변경하면 자동으로 Highcharts가 갱신된다.
    //     setOptions({
    //         ...initialOptions,
    //         series : tempSeries
    //     });
    // }

    // useEffect(()=>{
    //     asyncRequest();
    //     return ()=>{
    //         setOptions(initialOptions);
    //     }
    // },[]);

    return (
    <div>
        <HighchartsReact highcharts={ Highcharts } options={ options }/>
    </div>
    )
}

export default Chart;