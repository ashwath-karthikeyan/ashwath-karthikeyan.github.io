---
layout: post
title:  Sawyer Plays Mini-Golf
permalink: /minigolf/
date:   2020-01-05 17:13:00
image:  mgdemo_cropped.jpg
tags:   [ROS, Python, Computer Vision]
---

The goal of this project was to create a Robot Operating System (ROS) package that would allow a Rethink Robotics Sawyer robot to play miniature golf. The code for this project was written in Python using the rospy client library for ROS. The package makes use of the 3rd-party Python library OpenCV for computer vision, the ROS MoveIt! library for motion planning, and Gazebo for simulation.

### Code
The code for this project, plus additional documentation, can be found in [this](https://github.com/riley-knox/final-project-numg) GitHub repository.

### Description
This project required the fabrication of several pieces, specifically the putter and putting green. The putter was designed to interface with the gripper mechanism at the end of Sawyer's arm. Its design is included in the GitHub repository linked above. The putting green was a 4' x 8' acrylic board that was laser-cut with regulation size golf holes. We laid artificial turf over the board to simulate a putting surface.

We mounted an external USB camera to the ceiling to obtain a clear view of the game space. This allowed us to correctly identify the ball and the hole in the game area, and gave us a planar view of the space to help with calibration.

Our strategy for hitting a shot consisted of the following steps:
1. Bring Sawyer's arm to its home position to prevent obstructing the camera's view of the game space.
2. View the game space using the external camera and identify/locate the ball and hole within it.
3. Use previously determined calibration factors to translate the pixel locations of the ball and hole into Cartesian coordinates relative to Sawyer.
4. Position Sawyer's putter behind the ball such that the putter is pointed towards the hole.
5. Swing Sawyer's arm to hit the ball towards the hole.

### Results
We were successful in getting Sawyer to make shots that required motion at a single joint. We unfortunately did not have enough time to tune our system to successfully make shots requiring more complex motions. A video demonstration may be seen below.

### Video
<div class="video-box">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/8vYBKLIraps" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
