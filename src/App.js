import React from 'react';
import './App.css';
import axios from 'axios';
import ReactTable from "react-table"; 
import 'react-table/react-table.css'
import Trend from './Components/Trends'
class App extends React.Component{
  

  constructor(props){
    super(props);
    
    this.state = {

      data:[],
      aj_app_trend: [],
      aj_coh_trend: [],
      aj_app_sum: 0,
      aj_coh_sum: 0,

    }
  
  }

  async getTrendsData(){
    const URL = 'https://clarisights-users.s3.eu-central-1.amazonaws.com/frontend-assignment/1000+items+table+response.json';
    const response = await axios.get(URL)
    let td = response.data['data'];
    // console.log(td[0]['groups']['Campaign']['metadata'])
    // // console.log(td[0])
    // let obj = {}
    let td1 =[]
    console.log(td[0]['trend'])
    response.data['data'].forEach(e => {
      // obj = {
      //    'name':e['groups']['Campaign']['metadata']['name'],
            // 'aj_coh_trend':
      // }
      td1.push(e['groups']['Campaign']['metadata'])
      // e.['trend'].forEach
      // obj = {
      //    'name':e['groups']['Campaign']['metadata']['name'],
            // 'aj_coh_trend':
      // }

    });

    console.log(td1)
    var row1Sum = this.state.aj_app_sum;
    var row2Sum = this.state.aj_coh_sum;
    var app_t = [];                   // array to hold all values of  trend 'aj_app_and_installs'
    var coh_t = []                    // array to hold all values of  trend 'aj_coh_0w_and_real_acquisition'
    for(let i=0;i<td.length;i++)
    {   
      var temp1 = []                  // temp array to hold values of 'aj_app_and_installs' in a single object
      var temp2 = []                  // temp array to hold values of 'aj_coh_0w_and_real_acquisition' in a single object
      td[i]['trend'].forEach(element => {
          row1Sum += element['aj_app_and_installs']                // calculating global sum of 'aj_app_and_installs'
          temp1.push(element['aj_app_and_installs'])
          row2Sum += element['aj_coh_0w_and_real_acquisition']    // calculating global sum of 'aj_coh_0w_and_real_acquisition'
          temp2.push(element['aj_coh_0w_and_real_acquisition'])
      });
      app_t.push(temp1)
      coh_t.push(temp2)
    }
    

   
    this.setState({
                          data: td1,
                          aj_app_trend : app_t,
                          aj_app_sum: row1Sum,
                          aj_coh_trend : coh_t,
                          aj_coh_sum: row2Sum,
                          
              
                      });
                      // console.log(app_t)
                      // console.log(coh_t)
                      console.log(app_t[0])
  }
 
componentDidMount(){
  
        this.getTrendsData();    

      } 

  render() {

    const columns = [{  
      Header: 'Campaign_Name',  
      // accessor: 'groups.Campaign.metadata.name',
      accessor : 'name',
      maxWidth: 500
     }
     ,{  
      Header:() => <div>aj_app_and_installs_Trends<br/>{this.state.aj_app_sum}</div>,  
      accessor: 'trend.aj_app_and_installs' ,
      Cell: cellInfo => <Trend width={200} height={200} />,
      maxWidth: 350
      }
     ,{
     Header:() => <div>aj_coh_0w_and_real_acquisition_Trends<br/>{this.state.aj_coh_sum}</div>,
     accessor: 'Tre' ,
     Cell: cellInfo => <Trend width={200} height={200} />,
      maxWidth: 350
     }
  ]
    
    return (
        <div>
          <ReactTable  
      data={this.state.data}  
      columns={columns}  
      headerHeight={500}
      />
        </div>
         

     
    )
  }
  
  }




export default App;