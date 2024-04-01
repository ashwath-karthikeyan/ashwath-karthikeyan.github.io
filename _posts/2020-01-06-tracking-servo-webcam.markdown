---
layout: post
title:  Object Tracking with Servo-Controlled Webcam
permalink: /tracking/
date:   2019-09-20 02:18:00
image:  webcam_ball.jpg
tags:   [Python, Computer Vision, 3D Printing]
---

This is a quick, fun project that I whipped up over a few days using cheap, simple components. I assembled two servos and a bracket set into a pan-tilt mechanism that allows the attached camera to reach every configuration in a hemispherical space. Then, I wrote a Python algorithm that identifies an object within the camera frame based on its color, and activates the servos to align the frame's center with the object's center. While the program is running, you can follow the camera's tracking ability using the pop-up screen, which identifies the object and marks its center. Keep reading for more info and some demonstration clips!

### Code
The Python script for this project may be found in the GitHub repository [here](https://github.com/riley-knox/Motion-Tracking).

### Description
<img align="right" src="/img/tracking_ball.jpg" alt="Crosshairs" style="width:50%;padding-left:20px;padding-top:20px;padding-bottom:20px">
This project makes extensive use of the Python [OpenCV](https://opencv.org/) library, an open-source repository of computer vision functions. I used a number of these functions to isolate areas in the camera frame that have certain values in the [HSV color space](http://learn.leighcotnoir.com/artspeak/elements-color/hue-value-saturation/), and to "smooth out" these regions so they are a) more cohesive and b) more accurately represent the shape of the tracked object, in this case a ball. Then, I used a few more OpenCV functions to circle the ball and mark its center with a crosshair. The user's pop-up screen is shown at right.

Once the center of the ball is identified, the algorithm compares its location to the center of the camera frame and determines the necessary motion in the pan (left/right) and tilt (up/down) dimensions. The algorithm uses [proportional control](https://whatis.techtarget.com/definition/proportional-control) to move the camera by smaller amounts as the centers get closer together. Without proportional control, the camera would wiggle back and forth once the ball was at the center of the frame. The algorithm uses [serial communication](https://learn.sparkfun.com/tutorials/serial-communication/all) to tell the servos where to go!

Finally, I wanted to make the physical system more robust, so I designed two mounting jigs - one to hold the whole system and another to connect the camera to the brackets. I 3D-printed the jigs using one of the Ultimaker 3 printers we have in our fabrication space, using a very nice canary yellow filament. You can see both jigs in the demonstration .gif below.

<div class="post-flex-display">
    <img src="/img/tracking1.gif" alt="tracking1.gif" style="width:75%">
</div>
