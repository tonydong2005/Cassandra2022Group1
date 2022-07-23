#!/bin/sh
tableStats()
{
	nodetool tablestats
}

tableStats > ./table_info.txt