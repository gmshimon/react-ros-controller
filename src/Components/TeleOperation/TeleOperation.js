import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Joystick } from 'react-joystick-component';
import Config from'../Scripts/Config'
const TeleOperation = () => {
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
        })
        ros?.on("close", () => {
            console.log("Robot is disconnected")
            setTimeout(() => {
                ros_connection();
            },Config.RECONNECTION_TIMER)
        })
        ros_connection()
    }
    init_connections()
    const handleMove = (event) => {
        console.log(event.x)
        console.log('handleMove');
        // we need to create a ROS publisher on the topic cmd_vel
        let cmd_vel = new window.ROSLIB.Topic({
            ros: ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: 'geometry_msgs/Twist',
        })
        // we need to create a twist message to be published to rosbridge
        var twist = new window.ROSLIB.Message({
            linear: {
                x: event.x,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: event.y,
            }
        });
        //we need to publish the message on the cmd_vel topic
        cmd_vel.publish(twist);
    }
    const handleStop = () => { 
        console.log('handle Stop')
        // we need to create a ROS publisher on the topic cmd_vel
        let cmd_vel = new window.ROSLIB.Topic({
            ros: ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: 'geometry_msgs/Twist',
        })
        // we need to create a twist message to be published to rosbridge
        var twist = new window.ROSLIB.Message({
            linear: {
                x: 0,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: 0,
            }
        });
        //we need to publish the message on the cmd_vel topic
        cmd_vel.publish(twist);
    }
  return (
      <Container>
          <div className='mt-3'>   
              <Joystick
                  size={150}
                  sticky={false}
                  baseColor="#EEEEEE"
                  stickColor="#BBBBBB"
                  move={handleMove}
                  stop={handleStop}
              ></Joystick>
          </div>
    </Container>
  )
}

export default TeleOperation