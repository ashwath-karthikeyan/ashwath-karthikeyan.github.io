---
layout: post
title:  Kalman Filtering
permalink: /Kalman Filter/
date:   2024-03-05
image:  ekf.png
tags:   [State Estimation, Control]
---
## State Estimation with Extended Kalman Filter

State estimation is an important technique used in fields such as robotics and aerospace, where true system states are often obscured or indirectly observed through noisy sensors. Techniques like Extended Kalman Filter (EKF) are employed to infer these hidden states by making use of mathematical models and measurements. 

EKF helps to combine predictions about the system's behavior, which are based on its dynamics, with actual noisy sensor readings. By continually updating its estimates with new sensor data, EKF adjusts for uncertainties and errors, refining its predictions over time. This process allows the system to maintain accurate and reliable information about its state, which is essential for tasks like navigation, control, and decision-making, ensuring that the system operates effectively even in the presence of unpredictable factors.

#### Problem statement

Let's now imagine that we have an autonomous vehicle, represented by the Dubins Car Model. This can be written as a system with a state vector given by

$$x = \begin{bmatrix}p_x \\p_y\\ \theta \\ v \\ \phi \end{bmatrix}$$

and a transition vector given by

$$\dot x= f(x,u) =\begin{bmatrix} \dot p_x \\ \dot p_y\\ \dot \theta \\ \dot v\\ \dot \phi\end{bmatrix} = \begin{bmatrix} v\ cos(\theta) \\v\ sin(\theta)\\\frac{v}{L}tan(\phi)\\a\\ \psi\end{bmatrix}.$$

We want to control the car's motion in its configuration space with the help of the control vector given by

$$u = \begin{bmatrix}a \\ \psi \end{bmatrix}.$$

<center><img src="/img/dubbin.png" alt="dubbin" height="400" width="400"></center>
<br>

The issue is that we do not have a direct reading of its state space. Instead we have a GPS sensor that can calculate the car's forward velocity $v$, the heading rate $\dot \theta$, and the global coordinates $(g_x, g_y)$. The GPS sensor is located at point $(g_x^{ref}, g_y^{ref})$ in the ego frame. Thus, the measurement vector can we written as 

$$ z = \begin{bmatrix}v\\\dot\theta\\g_x\\g_y \end{bmatrix}$$

However, on testing, we find out that there are errors in the dynamics model. This is to be expected, since Dubins Car is only a theoretical model of a real vehicle's dynamics, and theory will only take you so far. 

The results of testing give us reason to believe that 

1. Due to physical issues with the acceleration pedal, the set acceleration $a$ has an error of standard deviation $\lvert a \rvert \cdot \sigma_a$.

2. There is an error in the steering angle, $\phi$, causing the heading $\theta$ to deviate, especially at high speeds. This error has the standard deviation $\lvert v \rvert \cdot \sigma_\theta$.

3. The vehicle's position slips occassionally, and the velocity error in the forward direction is estimated to have a standard deviation $\lvert v \rvert \cdot \sigma_{fwd}$ and the error in the sideways direction has an SD of $ \lvert v \rvert \cdot \ \sigma_{side}$.

We also discover during testing that there are noises in the GPS sensor's observation

1. The magnitude of error in velocity increases with velocity, and the standard deviation is given by $\lvert v \rvert \cdot \sigma_v$.

2. Heading rate measurement has errors with SD $\sigma _{\dot \theta}$

3. Both $x$ and $y$ direction readings have errors with SD $\sigma_g$

#### Solving the Problem

Let's now see how we can solve this problem with the help of an EKF.

In EKF, the process begins with a prediction step using a predefined mathematical model of the system dynamics, which estimates the state forward in time. This model is typically represented as a program of differential equations.

Then, the update step adjusts this prediction based on new sensor measurements. The relationship between the measured values and the system states is defined by a measurement model, which like the system model, can be nonlinear and is linearized in the context of EKF.

Both the system and measurement models are subject to uncertainties. EKF addresses this by assuming that both the process and measurement noises are Gaussian, which simplifies the computation of the Kalman gain—a factor that determines the weighting of the new measurement relative to the prediction.

##### Building the model

The first step is to gather and understand all the components that are required to make the process work smoothly.

First, our state vector, $x$, given to be 

$$x = \begin{bmatrix}p_x \\p_y\\ \theta \\ v \\ \phi \end{bmatrix}$$

Next our transition vector, $f$, also given

$$f(x) = \begin{bmatrix} v\ cos(\theta) \\v\ sin(\theta)\\\frac{v}{L}tan(\phi)\\a\\ \psi\end{bmatrix}$$

Our control vector, $u$,

$$u = \begin{bmatrix}a \\ \psi \end{bmatrix}$$

And finally our measurement function, $h(x)$ which is a mapping from the state space to the measurement space. We know the measurement vector is 

$$z = \begin{bmatrix}v\\\dot\theta\\g_x\\g_y \end{bmatrix}$$

We are also told that the GPS sensor is at $(g_x^{ref}, g_y^{ref})$ on the robot, but we know that to transform a point from one frame to other, we have to rotate and translate it.

$$ \begin{bmatrix}g_x\\g_y \end{bmatrix} = R(\theta)\begin{bmatrix} g_x^{ref} \\g_y^{ref}\end{bmatrix} +\begin{bmatrix} p_x\\p_y \end{bmatrix} $$

But 

$$R(\theta) =\begin{bmatrix} cos(\theta) &-sin(\theta) \\sin(\theta)&cos(\theta)\end{bmatrix}$$

So, by further calculation we get :

$$\begin{bmatrix} g_x \\g_y\end{bmatrix} = \begin{bmatrix} cos(\theta) &-sin(\theta) \\sin(\theta)&cos(\theta)\end{bmatrix}\begin{bmatrix} g_x^{ref} \\g_y^{ref}\end{bmatrix}+ \begin{bmatrix} p_x\\p_y \end{bmatrix}$$

$$= \begin{bmatrix} p_x + g_{x}^{ref}cos(\theta) - g_{y}^{ref}sin(\theta) \\p_y+g_{y}^{ref}cos(\theta) + g_{x}^{ref}sin(\theta)\end{bmatrix}$$

Therefore, by substituting it into the original $z$ vector we get

$$ h(x) = \begin{bmatrix} v \\\frac{v}{L} tan(\phi)\\p_x + g_{x}^{ref}cos(\theta) - g_{y}^{ref}sin(\theta) \\p_y+g_{y}^{ref}cos(\theta) + g_{x}^{ref}sin(\theta)\end{bmatrix}$$

##### Linearizing the model

The first step of solving this is to linearize the model we've been given to be able to plug the various matrices into an EKF. This is done to ...

<center><img src="/img/ekf.png" alt="EKF" height="400" width="400"></center>
<br>

[github repo](https://github.com/ashwath-karthikeyan/kalman-filter.git)