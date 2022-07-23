#!/bin/sh
clusterInfo()
{
	nodetool describecluster
}

clusterInfo > ./cluster_info.txt