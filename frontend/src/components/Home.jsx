import React from 'react'
import { useState, useEffect } from 'react';
import "../styles/home.css";
import useHome from './useHome';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import PostsList from './PostsList';
import FileUploader from './FileUploader';
import * as CSV from "csv-string"
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAuth0 } from "@auth0/auth0-react";


function Home(){
    const {info, setInfo, submit} = useHome()
    const [list, setList] = useState([])
    const [tempSelect, setTempSelect] = useState({x: '', y: ''})
    const { isAuthenticated } = useAuth0();
    const fileReader = new FileReader();

    const options = {
        chart: {
            type: 'bar',
            zoomType: "x"

        },
        title:{
            text: ""
        },
        xAxis: {
          title: {
            text: info.xData.name ? info.xData.name : "X-Axis",
          },
          minRange: 1,
          categories: info.xData.values ? info.xData.values : [],
        },
    
        yAxis: {
          title: {
            text: info.yData.name ? info.yData.name : "Y-Axis",
          },
        },
        series: [
          {
            data: info.yData.values
              ? info.yData.values.map((el) =>Number(el))
              : [],
          },
        ],
      };

    useEffect(() => {
        if(info.file != null){
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                const arr = CSV.parse(csvOutput)
                const headers = arr[0]
                arr.splice(0,1)
                const refinedList = []
                headers.forEach((header, index) => {
                    // Item list for each column aka header...
                    const values = [];
                    // Get items from the rows at index of header..
                    arr.forEach((row) => {
                      values.push(row[index].trim());
                    });
                    // Now push to refined list of colums...
                    refinedList.push({
                      name: header.trim(),
                      values: values,
                    });
                  });
                  setList(refinedList)
            };

            fileReader.readAsText(info.file);
        }
    }, [info.file]);

    const handleSelection = (event) => {
        event.preventDefault()
        const x = tempSelect.x
        const y = tempSelect.y
        // Find selected item...
        const x_list = list.find((el) => el.name === x);
        const y_list = list.find((el) => el.name === y);
        // Set selected x & y...
        setInfo({
          xData: x_list,
          yData: y_list,
        });
      };

    const handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target;
        setTempSelect(prevState => ({
            ...prevState,
            [name]: value
        }));
        
    }

    return(
        <div className="home">
            { info.hasError ? <Alert severity="error"> {info.errorMessage} </Alert> : <></>}
            <div className = "card"> 
              {(() => {
              if (isAuthenticated) 
                return <div className = 'tweet'>
                  <form className = "post-form" onSubmit={submit}>
                    <textarea className='text-tweet' placeholder='Share something...' value = {info.post} onChange={(e) => setInfo({post:e.target.value})}>                     
                    </textarea>
                    <div className = "graph-preview">
                        {
                            info.file != null ?
                            <div>
                            <div className="x-y" style={{ marginTop: 30 }}>
                            <select name="x" value={tempSelect.x} onChange={handleChange} required>
                            <option>X AXIS</option>
                                {list.map((item) => (
                                    <option key={item.name}>{item.name}</option>
                                ))}
                            </select>
                            <select name="y" value={tempSelect.y} onChange={handleChange} required>
                            <option>Y AXIS</option>
                            {list.map((item) => (
                            <option key={item.name}>{item.name}</option>
                            ))}
                            </select>
                            <button onClick={handleSelection}>Apply</button>
                            </div>
                            <section style={{ marginTop: 20 }}>
                            <HighchartsReact highcharts={Highcharts} options={options} />
                            </section>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className='aftertextarea'>                 
                      {
                          info.hasSubmitted ?
                          <CircularProgress />
                          :
                          <button className="post" type="submit">Post</button>
                      }
                      <FileUploader
                      onFileSelectSuccess={(fileupload) => setInfo({file: fileupload})}
                      />
                    </div>
                  </form>
                </div>;
              else 
                return <h1 className='loginmessage'>Log in to post</h1>;
              })()}

              <div className = 'posts'>
                  <PostsList />
              </div>

            </div>
        </div>
    )
}

export default Home