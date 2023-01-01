import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Config from'../Scripts/Config'
const Connections = () => {
    const [connection, setConnection] = useState(false);
    const [ros, setRos] = useState(null);
    
    useEffect(() => {
        const hehe = new window.ROSLIB.Ros()
        setRos(hehe)
    },[])

    const ros_connection = () => {
        try {
            ros?.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT)
        }
        catch (error) {
            console.log(error)
        }
    }

    function init_connections() {
        ros?.on("connection", () => {
            console.log("Robot is connected")
            setConnection(true)
        })
        ros?.on("close", () => {
            console.log("Robot is disconnected")
            setConnection(false)
            setTimeout(() => {
                ros_connection();
            },Config.RECONNECTION_TIMER)
        })
        ros_connection()
    }
    init_connections()
    return (
    <div>
        <h1>Connections</h1>   
          <Alert variant={connection?'success':'danger'} className='text-center m-3'>{connection?'Robot Connected':'Robot Disconnected'}</Alert>
    </div>
  )
}

export default Connections