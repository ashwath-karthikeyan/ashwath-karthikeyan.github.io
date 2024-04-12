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

This project is the outcome of an [online course](https://www.udemy.com/course/ros-navigation/) I took, which was a solid introduction to ROS-Gazebo, mobile robotics and most importantly, SLAM algorithms. ROS has a relatively high learning curve, but this course simplifies the process and holds your hand through the setup, installation and a quick implementation of a simple project, and I recommend everyone starting out in robotics and ROS to check it out.

As can be seen in the name, Simultaneous Localization and Mapping is a combination of two tasks performed at once. Localization is the process by which a robot determines its position within an environment, often relative to a known location. Mapping, on the other hand, involves the creation of a map of the environment itself. The inherent challenge in SLAM is that effective mapping requires accurate localization, and accurate localization depends on a detailed map. This interdependency creates a complex chicken-and-egg problem, as each task requires the other to be completed successfully. SLAM algorithms are designed to solve this dilemma by updating the map and the robot's position simultaneously, using data from sensors and previous maps.

### Installing TurtleBot3

The first step in validating our implementation is to develop an environment to test it. Robotis provides a comprehensive guide to install their TurtleBot3 (TB3) library on their [e-manual](https://emanual.robotis.com/docs/en/platform/turtlebot3/simulation/). The TB3 library allows for simulation in Gazebo as well as real-world operation; it is a powerful tool to use to quickly get your mobile robotics project to roll-out, without having to worry about a lot of the details of planning, control or odometry. Setting up the simulation environment is as simple as downloading the packages, but hooking up the physical rig to do the same is slightly more involved.

### Running environment

[github repo](https://github.com/ashwath-karthikeyan/ros-slam-gazebo.git)