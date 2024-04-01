---
layout:     post
title:      Pathfinding with Rapidly-Exploring Random Tree
permalink:  /rrt/
date:       2019-09-30 12:00:00
image:      rrt_header.png
tags:       [Python, Algorithms, Robotics]
---

Path planning is an integral part of working with mobile robots - after all, robots don't teleport from place to place! In order to get where it needs to go, a robot has to have a physical path through the space, a need that is often complicated by the presence of obstacles or other movement constraints. In this Python project, I implemented a path planning algorithm called a [rapidly-exploring random tree](https://en.wikipedia.org/wiki/Rapidly-exploring_random_tree), or RRT, to find a path through a 2-dimensional environment containing a number of differently-sized obstacles.

### RRT Description

There are a lot of pretty confusing descriptions of the RRT theory out there, so I'll try to keep it simple.

An RRT consists of a set of points, or nodes, in a space connected by straight-line edges. To grow the tree, we pick a random spot in the space, then figure out which of the existing nodes is closest to the random point. Then, we draw a straight line between the random point and the closest node, and create a new node along that line a certain distance away from the closest node. By choosing a series of random points and creating a series of new nodes, the tree grows in different directions throughout the space. A 200-node RRT can be seen in the picture below.

<div class="post-flex-display">
    <img src="/img/rrt_simple.png" alt="Simple RRT" style="width:50%">
    <div class="full-line-object">
        <div class="caption">
            An example RRT. The distance between nodes is one graph unit.
        </div>
    </div>
</div>

### Exploration

Looking at the picture above, we can see that an RRT algorithm can be used to explore an area. The RRT above has a relatively small number of points, but the tree expands pretty uniformly through the space. You can imagine that a robot could visit each of the nodes in a tree to map out a room and figure out what it looks like, in terms of its size and what objects and obstacles are in it. However, this strategy isn't explicitly efficient. The tree generates nodes close to each other, but we don't know anything about the _sequence_ in which they were generated. If a robot were following this tree from the first generated node, to the second, third, fourth, and so on, it could be ping-ponging all over the map, rather than traveling between connected nodes. Therefore, it's important to keep track of "parent" nodes when generating the tree. We'll see how this becomes useful below.

### Pathfinding

<div class="post-flex-display">
    <img src="/img/rrt_cropped15.gif" alt="Pathfinding RRT" style="width:50%">
    <div class="full-line-object">
        <div class="caption">
            A pathfinding RRT. Nodes highlighted in red show the path from start to finish.
        </div>
    </div>
</div>

Here we see how an RRT can be used to navigate around obstacles between two points. When generating each new node, we perform collision detection with each obstacle, and we also note which existing node it's connected to - the "parent" node that I mentioned before. Another way of thinking about the parent is that it's the node in the tree that the randomly generated point was closest to. Keeping track of these parent nodes is important because it allows us to re-trace our steps once we find a clear path to the end point. By jumping from parent node to parent node all the way back to the starting point, we reconstruct the path that we can tell the robot to follow.

Looking at the clip above, we also notice two ways we can make this more applicable to a real-life robot. The first is that we can simplify the path to make it more efficient. The final route contains at least one hundred nodes, but we don't have to visit each of them to successfully navigate through the space. We could probably reduce the final path to a half-dozen segments that get us to our final destination quicker. The second is making sure we don't get too close to the obstacles. Our final path segment in particular goes right past the edge of an obstacle - a real robot would probably bump into it! What we would have to do is set some minimum clearance between our path and the obstacles to take the robot's physical size into consideration.

### Project Files

The source code for this algorithm can be found in [this Github repository](https://github.com/riley-knox/RRT).
