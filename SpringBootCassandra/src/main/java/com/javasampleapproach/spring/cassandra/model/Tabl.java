package com.javasampleapproach.spring.cassandra.model;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table
public class Tabl {

    @PrimaryKey
    private String tableName;


    public Tabl(String name) {
        tableName = name;
    }

    public String getTableName() {
        return tableName;
    }

    @Override
    public String toString() {
        return "Table [tableName" + tableName + "]";
    }

}