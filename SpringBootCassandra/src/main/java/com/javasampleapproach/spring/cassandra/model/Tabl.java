package com.javasampleapproach.spring.cassandra.model;

import com.datastax.oss.driver.api.core.cql.Row;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.List;

@Table
public class Tabl {

    @PrimaryKey
    private String tableName;

    private String keyspaceName;
    private List<List<String>> rows;

    public Tabl(String name, String keyName, List<List<String>> data) {
        tableName = name;
        rows = data;
        keyspaceName = keyName;
    }

    public String getTableName() {
        return tableName;
    }

    public String getKeyspaceName() { return keyspaceName; }

    public List<List<String>> getRows() { return rows; }

    @Override
    public String toString() {
        return "Table [tableName" + tableName + "]";
    }

}