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
      aj_app_sum: 0,
      aj_coh_sum: 0,
      isLoading : false
    }
  
  }

  async getTrendsData(){
    this.setState({isLoading :true})
    const URL = '<some-url>';
    const response = await axios.get(URL)
    
    let td =[]
    var row1Sum = this.state.aj_app_sum;
    var row2Sum = this.state.aj_coh_sum;

      response.data['data'].forEach( e =>{
      
        var temp1 = []                  // temp array to hold values of 'aj_app_and_installs' in a single object
        var temp2 = []                  // temp array to hold values of 'aj_coh_0w_and_real_acquisition' in a single object
        e['trend'].forEach(element => {
            row1Sum += element['aj_app_and_installs']                // calculating global sum of 'aj_app_and_installs'
            temp1.push(element['aj_app_and_installs'])
            row2Sum += element['aj_coh_0w_and_real_acquisition']    // calculating global sum of 'aj_coh_0w_and_real_acquisition'
            temp2.push(element['aj_coh_0w_and_real_acquisition'])
         
        });
                           
                           
                              let obj = {
                                "name" : e['groups']['Campaign']['metadata']['name'],
                                "aj_app" : temp1,
                                "aj_coh" : temp2
                              }
                              td.push(obj)
        
      })
    
    this.setState({
                          data: td,
                          aj_app_sum: row1Sum,
                          aj_coh_sum: row2Sum,
                          isLoading : false
                      });
                
  }
 
componentDidMount(){
  
        this.getTrendsData();    

      } 

  render() {
    const columns = [{  
      Header:() => <strong>Campaign_Name</strong>,  
      accessor : 'name',
      maxWidth: 500
     }
     ,{  
      Header:() => <div><strong>aj_app_and_installs_Trends<br/>{this.state.aj_app_sum}</strong></div>,  
      accessor: 'trend.aj_app_and_installs' ,
      Cell: props => { //use props.aj_app
        
        return (
         <Trend  data = {props.original.aj_app}/>   
        );
      }  
    }
     ,{
     Header:() => <div><strong>aj_coh_0w_and_real_acquisition_Trends<br/><span color =''>{this.state.aj_coh_sum}</span></strong></div>,
     accessor: 'Tre' ,
     Cell: props => { //use props.aj_trends
      
      return (
       <Trend  data = {props.original.aj_coh}/>  
      );
    },
      maxWidth: 350
     }
  ]
    
    return (
        <div style={{
          backgroundColor: '#f9f9f9'}}>
          <h1 align = 'center' >Clarisights frontend-assignment</h1>
          <ReactTable  
      data={this.state.data}  
      columns={columns}
      loading = {this.state.isLoading}
      headerHeight={500}
      sortable = {false}
      />
        </div>
         

     
    )
  }
  
  }


export default App;
