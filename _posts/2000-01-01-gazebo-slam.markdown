---
layout: post
title:  SLAM in ROS-Gazebo
permalink: /gazebo-slam/
date:   2022-09-15
image:  slam.png
tags:   [SLAM]
---
## Implemtation of SLAM on TurtleBot3 Waffle in ROS-Gazebo

<center><img src="/img/slam.png" alt="SLAM" height="400" width="400"></center>
<br>

Simultaneous Localization and Mapping (SLAM) is a critical technology in robotics that enables autonomous robots to build a map of an unknown environment while simultaneously determining their position within that map. This dual capability is essential for applications such as autonomous vehicles, drones, and robotic vacuum cleaners, where precise navigation and obstacle avoidance are crucial. By using various sensors and algorithms, SLAM helps robots perceive their surroundings and navigate effectively, even in dynamic or unstructured environments. This project explores a simple implementation of SLAM techniques on a TurtleBot3 robot in a Gazebo environment.

This project is the result of what I learned from an [online course](https://www.udemy.com/course/ros-navigation/) I took, which was a solid introduction to ROS-Gazebo, mobile robotics, and most importantly, SLAM algorithms. ROS has an infamously steep learning curve, but this course simplifies the process and guides you through the setup, installation, and a quick implementation of a simple project. I recommend it to anyone starting out in robotics and ROS.

As can be seen in the name, Simultaneous Localization and Mapping is a combination of two tasks performed at once. Localization is the process by which a robot determines its position within an environment, often relative to a known location. Mapping, on the other hand, involves the creation of a map of the environment itself. The inherent challenge in SLAM is that effective mapping requires accurate localization, and accurate localization depends on a detailed map. This interdependency creates a complex chicken-and-egg problem, as each task requires the other to be completed successfully. SLAM algorithms are designed to solve this dilemma by updating the map and the robot's position simultaneously, using data from sensors and previously generated maps.

### Installing TurtleBot3 library

The first step in validating our implementation is to develop an environment to test it. Robotis provides a comprehensive guide to install their TurtleBot3 (TB3) library on their [e-manual](https://emanual.robotis.com/docs/en/platform/turtlebot3/simulation/). The TB3 library allows for simulation in Gazebo as well as real-world operation; it is a powerful tool to use to quickly get your mobile robotics project to roll-out, without having to worry about a lot of the details of planning, control or odometry. Setting up the simulation environment is as simple as downloading the packages, but hooking up the physical rig to do the same is slightly more involved.

Following the instructions in the e-manual, we download all the packages required and subsequently run `catkin_make` in the root directory to create a catkin workspace. We now have all the packages required for the project. If you are new to ROS, please refer to the official [ROS documentation.](https://wiki.ros.org/ROS/Tutorials)

After installation, we run the simulation script, which is also given in the e-manual. We also run the teleoperation command, showing us that in fact, everything works as it is supposed to.

### Offline SLAM

Now the most important part of Autonomous Navigation is understanding the environment, and map-building, which is the essense of SLAM. SLAM can be of essentially two types Online and Offline SLAM. Online SLAM is when you have no idea about the environment,  

### Map Navigation

Once the map of the environment is generated and stored, it can now be used as a starting point. This is one of the advantages of Offline-SLAM. If you have the ability to collect data of the environment beforehand, it improves the navigation in many ways:

1. **Map Accuracy**: By processing extensive data offline, SLAM can produce more accurate and reliable maps without the real-time computational constraints. This results in a high-quality map that can be used for precise navigation.

2. **Resource Allocation**: Performing SLAM offline frees up computational resources on the robot during real-time operations. This allows the robot to allocate more processing power to other critical tasks such as obstacle avoidance, path planning, and dynamic decision-making.

3. **Path Optimization**: With a pre-established map, the robot can plan paths more efficiently. It can calculate optimal routes ahead of time, considering various factors like the shortest path, least obstacles, or safest routes.

4. **Error Reduction**: Offline SLAM can extensively analyze data to correct errors in sensor readings and mapping, reducing drift and cumulative errors that often occur in real-time mapping.

5. **Enhanced Situational Awareness**: Having a pre-built map allows the robot to better understand its environment, anticipate potential issues, and adapt to changes detected in real-time compared to what was previously mapped.

[github repo](https://github.com/ashwath-karthikeyan/ros-slam-gazebo.git)