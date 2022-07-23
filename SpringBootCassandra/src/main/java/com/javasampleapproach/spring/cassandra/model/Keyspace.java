package com.javasampleapproach.spring.cassandra.model;

import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

public class Keyspace {

    private String keyspaceName;
    private List<Tabl> tables;

    public Keyspace(String name, List<Tabl> list) {
        keyspaceName = name;
        for (Tabl s : list) {
            if (tables != null) {
                tables.add(s);
            }
        }
    }

    public String getKeyspaceName() {
        return keyspaceName;
    }

    public List<Tabl> getTables() { return tables; }

    @Override
    public String toString() {
        return "Keyspace [keyspaceName" + keyspaceName + "]";
    }

}
