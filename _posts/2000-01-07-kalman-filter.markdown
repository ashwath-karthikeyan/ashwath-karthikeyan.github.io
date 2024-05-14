---
layout: post
title:  Kalman Filtering
permalink: /Kalman Filter/
date:   2024-03-05
image:  ekf.png
tags:   [State Estimation, Control]
---
## State Estimation with Extended Kalman Filter

State estimation is an important topic in various fields like robotics and aerospace, where a lot of the state information is not readily available from sensors and the measurements are very noisy. For example, we would love to know the robot's $[x,y,\theta]$ values in the local frame so we can easily control its motion. But usually, we do not have the sensors that can directly measure these values and inevitably, the readings are too erroneous to use as such.

State estimation techniques like Extended Kalman Filtering (EKF) use predefined mathematical models of the system and with known relationships between the measured value and the required quantities to accurately predict over time the actual state of the system. These techniques also account for noise in the measurements (noise must be Gaussian in Kalman Filters) and errors in the system model.

#### Our Problem

Let us now imagine that we have an autonomous vehicle, defined with the help of the Dubins Car Model. This can be written as a system with a state vector given by

$$x = \begin{bmatrix}p_x \\p_y\\ \theta \\ v \\ \phi \end{bmatrix}$$

and a transition vector given by

$$\dot x= f(x,u) =\begin{bmatrix} \dot p_x \\ \dot p_y\\ \dot \theta \\ \dot v\\ \dot \phi\end{bmatrix} = \begin{bmatrix} v\ cos(\theta) \\v\ sin(\theta)\\\frac{v}{L}tan(\phi)\\a\\ \psi\end{bmatrix}.$$

We want to control the car's motion in its configuration space with the help of the control vector given by

$$u = \begin{bmatrix}a \\ \psi \end{bmatrix}.$$

The issue is that we do not have a direct reading of its state space. Instead we have sensors that can calculate its forward velocity $v$, the heading rate $\dot \theta$, and the global coordinates $(g_x, g_y)$ from a GPS sensor, with the GPS sensor located at point $(g_x^{ref}, g_y^{ref})$ in the robot's reference frame.

However, on testing, we find out that there are errors in the dynamics model. This is to be expected, since Dubins Car is only a theoretical model of a real vehicle's dynamics, and theory will only take you so far. 

The results of testing give us that the acceleration $a$ has an error of magnitude $\mid a \mid \cdot \sigma_a$, where $\sigma_a$ is the standard deviation of the error.

There is also an error in the heading, $\theta$ due to wear in the tire and steering system faults, which results in the change in the steering angle $\phi$ not being translated into a change in heading as expected, and this is further pronounced at high velocities. The error seems to be form of $\dot \theta = \lvert v \rvert \cdot \sigma_\theta$
 

Additionally, there are also errors in the sensor values.



<center><img src="/img/ekf.png" alt="EKF" height="400" width="400"></center>
<br>

[github repo](https://github.com/ashwath-karthikeyan/kalman-filter.git)