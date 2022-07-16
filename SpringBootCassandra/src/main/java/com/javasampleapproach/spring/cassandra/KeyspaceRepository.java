package com.javasampleapproach.spring.cassandra;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.Row;
import com.datastax.oss.driver.api.core.metadata.schema.ColumnMetadata;
import com.datastax.oss.driver.api.core.type.DataType;
import com.datastax.oss.driver.api.core.type.DataTypes;
import com.datastax.oss.driver.api.querybuilder.QueryBuilder;
import com.datastax.oss.driver.api.querybuilder.relation.Relation;
import com.datastax.oss.driver.api.querybuilder.select.Select;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class KeyspaceRepository {

    private CqlSession session;
    private ArrayList<String> xd = new ArrayList<>();

    public KeyspaceRepository(CqlSession session) {
        this.session = session;
        xd.add("B");
        xd.add("KB");
        xd.add("MB");
        xd.add("GB");
        xd.add("TB");
        xd.add("PB");
        xd.add("EB");
        xd.add("ZB");
    }

    public List<String> getKeyspaceList() {
        Select select = QueryBuilder.selectFrom("system_schema", "keyspaces").all();
        ResultSet rs = session.execute(select.build());
        List<String> result = new ArrayList<>();
        rs.forEach(x -> result.add(x.getString("keyspace_name")));
        return result;
    }

}
