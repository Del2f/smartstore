// import react , {useState, useEffect} from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function StoreChart(props: any){

    let today = new Date();
    let setDay = -1; //일자를 조절하시면 됩니다. -1이면 하루전/ +1이면 내일
    today.setDate(today.getDate() + setDay );
    
    let year   = today.getFullYear();
    let month  = ('0' + (today.getMonth() +  1 )).slice(-2);
    let day    = ('0' + today.getDate()).slice(-2);
    let day_result = month + "." + day + ".";

    const series2 = props.data;    //App.js에서 데이터를 보내줄 예정
    const options = {
        chart: {
            type: 'spline',		// bar차트. 아무 설정이 없으면 line chart가 된다.
            height: '130px'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            tickPositions : [0,2,4,6,8,10,12,14,16,18,20,22]
        },
        yAxis: {
            title: {
                text: ''
            },
            gridLineDashStyle: 'dot',
            gridLineColor: '#dfe5e7',
            categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            tickPositions : [0,2,4]
        },
        legend: {
            enabled: false
        },
        tooltip : {
            borderColor: '#999999',
            // pointFormat: '<span style="color:red">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
            formatter: function (this: any) {

                var time1 = ('0' + this.x).slice(-2);
                var time2 = ('0' + (this.x + 1)).slice(-2);
                var time_result = '<p style="font-weight:300; font-size: 12px; color: #888888;">'+ time1 +'시-'+ time2 +'시 </p>';

                var x = '<div style="font-weight:600; font-size: 12px; color: #666666;">' + day_result + '</div><br>';
                var y = '<p style="font-weight:600; font-size: 18px; color: #40c65a;">' + this.y + '</p>';
                var unit = '<p style="font-weight:300; font-size: 12px; color: #888888;"> 회</p>'

                return  x + time_result + y + unit ;
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

export default StoreChart;