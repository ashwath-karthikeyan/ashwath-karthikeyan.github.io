---
layout: post
title:  Kalman Filtering
permalink: /Kalman Filter/
date:   2024-03-05
image:  ekf.png
tags:   [State Estimation]
---
## State Estimation with Extended Kalman Filter

State estimation is an important topic in various fields like robotics and aerospace, where a lot of the state information is not readily available from sensors, or it's not possible to directly measure state information. For example, we would love to know the robot's $[x,y,\theta]$ values in the local frame so we can easily control its motion. But we either do not have the sensors that can directly measure these values, or the sensors exist, but inevitably, the readings have noise, or most commonly, both. This is where state estimation comes in.

#### Dubin's Car Model

Dubin's car model is a mathematical model that 

<center><img src="/img/ekf.png" alt="EKF" height="400" width="400"></center>
<br>

[github repo](https://github.com/ashwath-karthikeyan/kalman-filter.git)